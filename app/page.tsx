'use client';

import { fetchDictionaryEntry } from '@/lib/drupal-api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchPage() {
  const [word, setWord] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous errors
    setError('');

    // Validate empty input
    if (!word.trim()) {
      setError('Please enter a word to search');
      return;
    }

    setIsLoading(true);

    try {
      const entry = await fetchDictionaryEntry(word.trim());

      // Word not found - show error WITHOUT navigation
      if (entry === null) {
        setError(`Word "${word.trim()}" not found in the dictionary`);
        setIsLoading(false);
        return; // Do NOT navigate
      }

      // Success - navigate to word page
      router.push(`/word/${word.trim()}`);
    } catch {
      // API failure - show error WITHOUT navigation
      setError('Failed to connect to dictionary service. Please try again.');
      setIsLoading(false);
      return;
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Dictionary Lookup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word..."
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    </main>
  );
}
