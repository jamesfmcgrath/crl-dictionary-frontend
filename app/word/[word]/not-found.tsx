import Link from 'next/link';

/**
 * Custom 404 page for word not found
 * Triggered when notFound() is called in page.tsx
 */
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Word Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          This word doesn&apos;t exist in our dictionary. Try searching for a
          different word.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Search
        </Link>
      </div>
    </main>
  );
}
