import { logger } from '@/libs/Logger';
import { parse } from 'node-html-parser';
import { assertNonNullable } from '../assertions/assertNonNullable';
import { isNotNull } from '../guards/isNotNull';

/**
 *
 * @param data The text html of the page to parse
 * @returns A record of metadata keys and values or undefined if no metadata was found
 * @throws If there was an error parsing the metadata
 */
export const parseMetadataPageText = (data: string): Record<string, string[]> | undefined => {
  try {
    const parsedData = parse(data);

    const tableElement = parsedData.querySelector('#bibrec > div > table');

    if (tableElement) {
      const rows = tableElement.querySelectorAll('tr');
      const metadata = new Map<string, string[]>();
      for (const row of rows) {
        const key = row.querySelector('th')?.text.trim();
        const value = row.querySelector('td')?.text.trim();
        if (isNotNull(key) && isNotNull(value)) {
          if (metadata.has(key)) {
            const currentValue = metadata.get(key);
            assertNonNullable(currentValue);
            metadata.set(key, [...currentValue, value]);
          } else {
            metadata.set(key, [value]);
          }
        }
      }
      if (metadata.size !== 0) {
        return Object.fromEntries(metadata);
      }
    }
    logger.warn('No metadata found in the page with the expected structure');
    return undefined;
  } catch (error) {
    logger.error({
      error,
    }, 'Error parsing metadata page text');
    throw error;
  }
};
