import type {
  DictionaryEntry,
  DrupalJsonApiResponse,
} from '@/types/dictionary';

/**
 * Fetch dictionary entry from Drupal JSON:API
 *
 * @param word - Word to look up
 * @returns DictionaryEntry if found, null if not found
 * @throws Error for network failures or malformed responses
 */
export async function fetchDictionaryEntry(
  word: string
): Promise<DictionaryEntry | null> {
  const baseUrl = process.env.DRUPAL_BASE_URL;

  if (!baseUrl) {
    throw new Error('DRUPAL_BASE_URL environment variable is not configured');
  }

  // JSON:API filter syntax - exact match on field_word
  const url = `${baseUrl}/jsonapi/node/dictionary_entry?filter[field_word]=${encodeURIComponent(
    word
  )}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store', // Fresh data for dictionary lookups
      headers: {
        Accept: 'application/vnd.api+json', // JSON:API content type
      },
    });

    // Network/server errors - these are unexpected failures
    if (!response.ok) {
      throw new Error(
        `Drupal API returned ${response.status}: ${response.statusText}`
      );
    }

    const json: DrupalJsonApiResponse = await response.json();

    // Empty data array = word not found (expected case)
    if (!json.data || json.data.length === 0) {
      return null;
    }

    // Extract first entry (filter ensures only one match)
    const entry = json.data[0];

    // Transform JSON:API structure to app-level type
    return {
      word: entry.attributes.field_word,
      definitions: entry.attributes.field_definitions,
    };
  } catch (error) {
    // Network failures, JSON parse errors, etc.
    if (error instanceof Error) {
      throw new Error(`Failed to fetch dictionary entry: ${error.message}`);
    }
    throw new Error('Failed to fetch dictionary entry: Unknown error');
  }
}
