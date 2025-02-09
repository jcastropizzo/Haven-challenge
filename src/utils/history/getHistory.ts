import type { User } from '@clerk/nextjs/server';
import { db } from '@/libs/DB';
import { history } from '@/models/Schema';
import { eq } from 'drizzle-orm';

export const getHistory = async (user: User, { limit = 10, offset = 0 }: {
  limit?: number;
  offset?: number;
} = {}) => {
  const results = await db
    .query
    .history
    .findMany({
      where: eq(history.userId, user.id),
      orderBy: (entry, { asc }) => [asc(entry.createdAt)],
      offset,
      limit,
    });

  return results;
};
