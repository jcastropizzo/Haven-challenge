import { parse } from 'node-html-parser';
import { isNotNull } from '../guards/isNotNull';

export const parseMetadataPageText = (data: string) => {
  const parsedData = parse(data);

  const tableElement = parsedData.querySelector('#bibrec > div > table');

  if (tableElement) {
    const rows = tableElement.querySelectorAll('tr');

    const metadata = rows.map((row) => {
      const key = row.querySelector('th')?.text;
      const value = row.querySelector('td')?.text;
      if (!key || !value) {
        return null;
      }
      return {
        key,
        value,
      };
    }).filter(isNotNull);

    return metadata;
  }

  return [];
};
