import { BookDisplayer } from '@/components/BookDisplayer';
import { BookSearcher } from '@/components/BookSearcher';
import { logger } from '@/libs/Logger';
import { assertNonNullable } from '@/utils/assertions/assertNonNullable';
import { getBookMetadata } from '@/utils/gutenberg/getBookMetadata';
import { saveHistory } from '@/utils/history/saveHistory';
import { currentUser } from '@clerk/nextjs/server';

export default async function BookDisplay({
  params,
}: { params: Promise<{ bookId: string | undefined }> }) {
  const { bookId } = await params;

  let validatedBookId = bookId;

  if (Array.isArray(validatedBookId)) {
    validatedBookId = undefined;
  }

  if (validatedBookId === undefined || validatedBookId === '') {
    return (<>Please input a valid book id for me to search for!</>);
  }

  let bookMetadata: Awaited<ReturnType<typeof getBookMetadata>>;
  try {
    bookMetadata = await getBookMetadata(validatedBookId);
  } catch (error) {
    logger.error('BookDisplay couldn\'t get book metadata', error);
    return (<>Please contact support! </>);
  }

  const user = await currentUser();

  // This is an authenticated route
  // so we can safely assume that the user is not null
  assertNonNullable(user);

  await saveHistory(validatedBookId, user, bookMetadata.metadata?.Title?.[0] ?? 'NO_TITLE');

  return (
    <>
      <BookSearcher
        currentBookId={validatedBookId}
      />
      <BookDisplayer
        bookMetadata={bookMetadata.metadata}
      />
    </>
  );
}
