'use client';

import SearchForm from './components/SearchForm';

export default function SearchPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Dictionary Lookup
        </h1>

        <SearchForm />
      </div>
    </main>
  );
}
