'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type BookSearcherProps = {
  currentBookId: string | undefined;
};

export const BookSearcher: React.FC<BookSearcherProps> = ({ currentBookId }) => {
  const router = useRouter();

  const [bookId, setBookId] = useState<string | undefined>(currentBookId);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    // just for the sake of type narrowing in TS
    const localBookId = bookId;
    if (localBookId == null) {
      return;
    }
    setLoading(true);
    router.push(`/book-search/${localBookId}`);
  };

  return (
    <div className="py-5 [&_p]:my-6">
      <input
        id="bookId"
        placeholder="Book ID"
        value={bookId}
        type="text"
        className="ml-2 w-32 appearance-none rounded-sm border border-gray-200 px-2 py-1 text-sm leading-tight text-gray-700 focus:outline-hidden focus:ring-3 focus:ring-blue-300/50"
        onChange={e => setBookId(e.target.value)}
      />

      <button
        type="button"
        className="ml-2 rounded-sm bg-blue-500 px-5 py-1 font-bold text-white hover:bg-blue-600 focus:outline-hidden focus:ring-3 focus:ring-blue-300/50 disabled:pointer-events-none disabled:opacity-50"
        disabled={loading}
        onClick={handleSearch}
      >
        Search
      </button>
      <div>

      </div>

    </div>
  );
};
