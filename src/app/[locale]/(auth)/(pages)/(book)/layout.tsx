import { BaseTemplate } from '@/templates/BaseTemplate';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

export default async function BookSearchLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <BaseTemplate
      leftNav={(
        <>
          <li>
            <Link
              href="/book-search/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Book Search
            </Link>
          </li>
          <li>
            <Link
              href="/book-search-history/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Book Search History
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/user-profile/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              User Profile
            </Link>
          </li>
        </>
      )}
      rightNav={(
        <>
          <li>
            <SignOutButton>
              <button className="border-none text-gray-700 hover:text-gray-900" type="button">
                Sign out
              </button>
            </SignOutButton>
          </li>
        </>
      )}
    >

      {props.children}
    </BaseTemplate>
  );
}
