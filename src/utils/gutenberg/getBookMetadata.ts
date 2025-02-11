import { db } from '@/libs/DB';
import { bookMetadataSchema } from '@/models/Schema';
import { eq } from 'drizzle-orm';
import { saveMetadata } from '../bookMetadata/saveBookMetadata';
import { parseMetadataPageText } from './parseMetadataPageText';
import { logger } from '@/libs/Logger';

export const getBookMetadata = async (bookId: string): Promise<{
  bookId: string;
  metadata: Record<string, string[]>;
  updatedAt: Date;
  createdAt: Date;
} | undefined> => {

  const savedMetadata = await db.query.bookMetadataSchema
    .findFirst({
      where: eq(bookMetadataSchema.bookId, bookId),
    });

  if (!savedMetadata) {
    const bookFetchRequest
      = await fetch(`https://www.gutenberg.org/ebooks/${bookId}`, {
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

    const metadata = parseMetadataPageText(data);
    if (metadata === undefined) {
      return undefined;
    }

    const result = await saveMetadata(bookId, metadata);

    return result;
  } else {
    return savedMetadata;
  }
};
