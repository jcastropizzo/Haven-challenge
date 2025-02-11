'use client';

import { assertNonNullable } from '@/utils/assertions/assertNonNullable';
import { useState } from 'react';

type BookDisplayProps = {
  bookMetadata: Record<string, string[]>;
};

export const BookDisplayer: React.FC<BookDisplayProps> = ({ bookMetadata }: BookDisplayProps) => {

  const [hidden, setHidden] = useState(false);

  return (
    <div className="py-5 [&_p]:my-6">
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Information provided by Gutenberg!{" "}
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900 hover:cursor-pointer"
            onClick={() => setHidden(!hidden)}
          >{hidden ? "Hide metadata" : "Show metadata"}</span>
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        {hidden ? <dl className="divide-y divide-gray-100">
          {Object.keys(bookMetadata).map((key) => {
            const content = bookMetadata[key];
            assertNonNullable(content);
            return (
              <div key={`metadata-list-${key}`} className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">{key}</dt>
                <dd className="sm:col-span-2 sm:mt-0">
                  {content.map(value => (
                    <p className="text-sm/5 text-gray-500 mt-0" key={value}>{value}</p>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl> : <div />}
      </div>
    </div>
  );
};
