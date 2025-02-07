import { parseMetadataPageText } from '@/utils/gutenberg/parseMetadataPageText';

type BookDisplayProps = {
  currentBookId: string | undefined;
};

export const BookDisplayer: React.FC<BookDisplayProps> = async ({ currentBookId }: BookDisplayProps) => {
  if (currentBookId === undefined) {
    return (<>Please input a valid book id for me to search for!</>);
  }

  const bookFetchRequest
    = await fetch(`https://www.gutenberg.org/ebooks/${currentBookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  const data = await bookFetchRequest?.text();

  const metadata = parseMetadataPageText(data);

  return (
    <div className="py-5 [&_p]:my-6">
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">Information provided by Gutenberg!</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {metadata.map(({ key, value }) => (
            <div key={`metadata-list-${key}-${value.substring(0, 10)}`} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">{key}</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
