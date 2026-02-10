import { fetchDictionaryEntry } from '@/lib/drupal-api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

/**
 * Word detail page - displays dictionary entry for a specific word
 *
 * This is a server component that:
 * - Fetches data at request time
 * - Triggers 404 if word doesn't exist
 * - Renders definitions as a formatted list
 */
export default async function WordPage({
  params,
}: {
  params: Promise<{ word: string }>;
}) {
  // Next.js 15: params is now a Promise
  const { word } = await params;

  // Fetch the dictionary entry
  // fetchDictionaryEntry returns null if not found, throws on API errors
  const entry = await fetchDictionaryEntry(word);

  // If word doesn't exist in Drupal, show 404 page
  if (entry === null) {
    notFound();
  }

  // Split definitions by double newline (matches importer format)
  const definitionList = entry.definitions.split('\n\n').filter(Boolean);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
        >
          ← Back to search
        </Link>

        {/* Word heading */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 capitalize">
            {entry.word}
          </h1>

          {/* Definitions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Definitions
            </h2>
            <ul className="space-y-3">
              {definitionList.map((definition, index) => (
                <li
                  key={index}
                  className="text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-500"
                >
                  {definition}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Generate metadata for this page (optional but good practice)
 * Shows in browser tab and search results
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ word: string }>;
}) {
  const { word } = await params;

  return {
    title: `${word} - Dictionary`,
    description: `Definition of ${word}`,
  };
}
