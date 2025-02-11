import { db } from '@/libs/DB';
import { bookMetadataSchema } from '@/models/Schema';
import { eq } from 'drizzle-orm';
import { saveMetadata } from '../bookMetadata/saveBookMetadata';
import { parseMetadataPageText } from './parseMetadataPageText';
import { logger } from '@/libs/Logger';

export const getBookText = async (bookId: string): Promise<string | undefined> => {
  // TODO: Implement this function 
  // with a caching strategy
  const bookFetchRequest
    = await fetch(`https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  if (bookFetchRequest.status !== 200) {
    logger.error('Book not found', bookId);
    return undefined;
  }
  const data = await bookFetchRequest.text();
  return data;
};
