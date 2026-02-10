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
    field_definitions: string;
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
