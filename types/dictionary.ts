/**
 * JSON:API response structure from Drupal
 * This mirrors what comes over the wire - don't expose to components
 */
export interface DrupalJsonApiResponse {
  data: DrupalJsonApiEntry[];
  // JSON:API includes other fields (links, meta) but we don't need them
}

export interface DrupalJsonApiEntry {
  type: string; // e.g., "node--dictionary_entry"
  id: string; // UUID
  attributes: {
    field_word: string;
    /**
     * Drupal JSON:API can return text fields either as:
     * - a simple string, or
     * - an array of objects (for multi-value/long text) with a `value` property.
     *
     * We normalise this to a single string in `fetchDictionaryEntry`.
     */
    field_definitions:
      | string
      | {
          value: string;
          // Allow any extra properties Drupal might include
          [key: string]: unknown;
        }[];
    // Other fields exist but we only care about these
  };
}

/**
 * App-level dictionary entry
 * Simple, flat structure for components
 */
export interface DictionaryEntry {
  word: string;
  definitions: string;
}
