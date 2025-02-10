'use client';

import type { historySchema } from '@/models/Schema';
import Image from 'next/image';
import Link from 'next/link';

type BookSearchHistoryTableProps = {
  history: typeof historySchema.$inferSelect[];
};

export const BookSearchHistoryTable: React.FC<BookSearchHistoryTableProps> = ({ history }) => {
  return (
    <>
      <p className="pt-2">Displaying earliest 10 search history entries:</p>
      <ul className="divide-y divide-gray-100">
        {history.map((entry, index) => (
          <li key={entry.createdAt.toISOString()} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">{index + 1}</p>
              </div>
              <Image
                alt=""
                src={`https://www.gutenberg.org/cache/epub/${entry.bookId}/pg${entry.bookId}.cover.medium.jpg`}
                className="size-12 flex-none bg-gray-50"
                width={128}
                height={26}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">{entry.bookName}</p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">
                  Seen on:
                  <time dateTime={entry.createdAt.toISOString()}>{`${entry.createdAt.toLocaleDateString()} - ${entry.createdAt.toLocaleTimeString()}`}</time>
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <Link
                href={`/book-search/${entry.bookId}`}
                className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              >
                Book Id:
                {' '}
                {entry.bookId}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
