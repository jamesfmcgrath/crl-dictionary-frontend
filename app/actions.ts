'use server';

import { fetchDictionaryEntry } from '@/lib/drupal-api';
import type { DictionaryEntry } from '@/types/dictionary';

export async function searchWord(
  word: string
): Promise<DictionaryEntry | null> {
  return fetchDictionaryEntry(word);
}
