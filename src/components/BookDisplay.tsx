'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type BookDisplayProps = {
  currentBookId: string | undefined;
};

export const BookSearcher = ({ currentBookId }: BookDisplayProps) => {
  const router = useRouter();

  const [bookId, setBookId] = useState<string | null>(null);

  const handleSearch = async () => {
    // just for the sake of type narrowing in TS
    const localBookId = bookId;
    if (localBookId === null) {
      return;
    }

    if (currentBookId) {
      router.back();
    }

    router.push(localBookId);
  };

  return (
    <div className="py-5 [&_p]:my-6">
      <label className="text-sm font-bold text-gray-700">
        <input
          id="bookId"
          placeholder="Book ID"
          type="text"
          className="ml-2 w-32 appearance-none rounded-sm border border-gray-200 px-2 py-1 text-sm leading-tight text-gray-700 focus:outline-hidden focus:ring-3 focus:ring-blue-300/50"
          onChange={e => setBookId(e.target.value)}
        />
        <button
          type="button"
          className="ml-2 rounded-sm bg-blue-500 px-5 py-1 font-bold text-white hover:bg-blue-600 focus:outline-hidden focus:ring-3 focus:ring-blue-300/50 disabled:pointer-events-none disabled:opacity-50"
          disabled={bookId != null}
          onClick={handleSearch}
        >
          Search
        </button>
      </label>
    </div>
  );
};
