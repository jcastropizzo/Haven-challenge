import { LocaleSwitcher } from '@/components/LocaleSwitcher';
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
              href="/dashboard/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/user-profile/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Manage your account
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

          <li>
            <LocaleSwitcher />
          </li>
        </>
      )}
    >

      {props.children}
    </BaseTemplate>
  );
}
