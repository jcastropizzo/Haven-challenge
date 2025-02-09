import { db } from '@/libs/DB';
import { bookMetadata } from '@/models/Schema';
import { eq } from 'drizzle-orm';
import { saveMetadata } from '../bookMetadata/saveBookMetadata';
import { parseMetadataPageText } from './parseMetadataPageText';

export const getBookMetadata = async (bookId: string) => {
  const [savedMetadata] = await db
    .select()
    .from(bookMetadata)
    .where(eq(bookMetadata.bookId, bookId));

  if (!savedMetadata) {
    const bookFetchRequest
      = await fetch(`https://www.gutenberg.org/ebooks/${bookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    const data = await bookFetchRequest.text();

    const metadata = parseMetadataPageText(data);
    if (metadata === undefined) {
      throw new Error('Error parsing metadata');
    }

    const result = await saveMetadata(bookId, metadata);

    return result;
  } else {
    return savedMetadata;
  }
};
