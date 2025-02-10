import { db } from '@/libs/DB';
import {
  bookMetadataSchema,
} from '@/models/Schema';
import { assertNonNullable } from '../assertions/assertNonNullable';

export const saveMetadata = async (bookId: string, metadata: Record<string, string[]>) => {
  const [result] = await db
    .insert(bookMetadataSchema)
    .values({ bookId, metadata })
    .returning();
  assertNonNullable(result);
  return result;
};
