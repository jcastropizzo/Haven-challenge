import type { User } from '@clerk/nextjs/server';
import { db } from '@/libs/DB';
import { history } from '@/models/Schema';
import { assertNonNullable } from '../assertions/assertNonNullable';

export const saveHistory = async (bookId: string, user: User, bookName: string) => {
  const [result] = await db
    .insert(history)
    .values({ bookId, userId: user.id, bookName })
    .returning();
  assertNonNullable(result);
  return result;
};
