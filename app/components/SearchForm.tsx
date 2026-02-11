'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { searchWord } from '../actions';

export default function SearchForm() {
  const [word, setWord] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
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
      const entry = await searchWord(word.trim());

      // Word not found - show error WITHOUT navigation
      if (entry === null) {
        setError(`Word "${word.trim()}" not found in the dictionary`);
        return;
      }

      // Success - navigate to word page
      router.push(`/word/${word.trim()}`);
    } catch {
      // API failure - show error WITHOUT navigation
      setError('Failed to connect to dictionary service. Please try again.');
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="search-word" className="sr-only">
          Search for a word
        </label>
        <input
          type="text"
          id="search-word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word..."
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
        >
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
  );
}
