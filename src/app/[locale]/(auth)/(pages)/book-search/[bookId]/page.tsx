import { BookDisplayer } from '@/components/BookDisplayer';
import { BookSearcher } from '@/components/BookSearcher';
import { logger } from '@/libs/Logger';

export default async function BookDisplay({
  params,
}: { params: Promise<{ bookId: string | undefined }> }) {
  const { bookId } = await params;

  logger.info(bookId, bookId);
  logger.info('params', await params);

  let validatedBookId = bookId;

  if (Array.isArray(validatedBookId)) {
    validatedBookId = undefined;
  }

  return (
    <>

      <BookSearcher
        currentBookId={validatedBookId}
      />

      <BookDisplayer
        currentBookId={validatedBookId}
      />
    </>
  );
}
