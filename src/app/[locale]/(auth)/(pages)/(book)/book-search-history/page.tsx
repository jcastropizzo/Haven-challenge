import { Hello } from '@/components/Hello';
import { logger } from '@/libs/Logger';
import { assertNonNullable } from '@/utils/assertions/assertNonNullable';
import { getHistory } from '@/utils/history/getHistory';
import { currentUser } from '@clerk/nextjs/server';

const BookSearchHistory = async () => {
  const user = await currentUser();
  assertNonNullable(user);

  const history = await getHistory(user);
  logger.info(history);
  return (
    <>
      <Hello />
    </>
  );
};

export default BookSearchHistory;
