import { BookSearchHistoryTable } from '@/components/BookSearchHistoryTable';
import { assertNonNullable } from '@/utils/assertions/assertNonNullable';
import { getHistory } from '@/utils/history/getHistory';
import { currentUser } from '@clerk/nextjs/server';

const BookSearchHistory = async () => {
  const user = await currentUser();
  assertNonNullable(user);

  const history = await getHistory(user);

  return (
    <BookSearchHistoryTable
      history={history}
    />
  );
};

export default BookSearchHistory;
