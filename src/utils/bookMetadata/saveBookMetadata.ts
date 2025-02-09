import { db } from '@/libs/DB';
import { bookMetadata } from '@/models/Schema';
import { assertNonNullable } from '../assertions/assertNonNullable';

export const saveMetadata = async (bookId: string, metadata: Record<string, string[]>) => {
  const [result] = await db
    .insert(bookMetadata)
    .values({ bookId, metadata })
    .returning();
  assertNonNullable(result);
  return result;
};
