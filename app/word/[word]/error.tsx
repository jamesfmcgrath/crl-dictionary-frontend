'use client';

export default function WordError({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          Unable to load this dictionary entry. The service may be temporarily
          unavailable.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
