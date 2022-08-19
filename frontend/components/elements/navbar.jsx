import { useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { signIn, useSession } from 'next-auth/react';

import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';

import NextImage from './image';
import PrimaryButton from './primary-button';
import { useModalContext, MODAL_TYPES } from 'utils/context/modal-context';

export default function Navbar({ navbar }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [searchText, setSearchText] = useState();
  const { showModal } = useModalContext();
  const signinModal = () => {
    showModal(MODAL_TYPES.SIGNIN_MODAL, {});
  };
  return (
    <Disclosure as="header" className="bg-white shadow sticky top-0 z-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
            <div className="relative h-16 flex justify-between">
              <div className="relative z-10 px-2 flex lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  {navbar?.logo && (
                    <NextImage height={50} width={50} media={navbar.logo} />
                  )}
                </div>
              </div>
              <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-mediumBlue focus:border-mediumBlue sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mediumBlue">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                {navbar?.button && (
                  <PrimaryButton
                    size="medium"
                    text={`${!session ? 'Sign In' : 'Sign Out'}`}
                    onClick={signinModal}
                  />
                )}
              </div>
            </div>
            <nav
              className="hidden lg:py-2 lg:flex lg:space-x-8"
              aria-label="Global"
            >
              {navbar?.link?.map((item) => {
                console.log({ item });
                return item.protected && !session ? (
                  <button key={item.id} onClick={signinModal}>
                    <a
                      className={`
                      ${
                        router.asPath === item.url
                          ? '!bg-gray-100 !text-gray-900 '
                          : '!text-gray-900 !hover:bg-gray-50 !hover:text-gray-900 '
                      }
                      rounded-md py-2 px-3 inline-flex items-center text-sm font-medium !no-underline`}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.text}
                    </a>
                  </button>
                ) : (
                  <Link key={item.id} href={item.url}>
                    <a
                      className={`
                      ${
                        router.asPath === item.url
                          ? '!bg-gray-100 !text-gray-900 '
                          : '!text-gray-900 !hover:bg-gray-50 !hover:text-gray-900 '
                      }
                      rounded-md py-2 px-3 inline-flex items-center text-sm font-medium !no-underline`}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.text}
                    </a>
                  </Link>
                );
              })}
            </nav>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="pt-2 pb-3 px-2 space-y-1">
              {navbar?.link?.map((item) => {
                return item.protected && !session ? (
                  <button key={item.id} onClick={signinModal}>
                    <a className="!no-underline">
                      <Disclosure.Button
                        className={`${
                          router.asPath === item.url
                            ? '!bg-gray-100 !text-gray-900 '
                            : '!text-gray-900 !hover:bg-gray-50 !hover:text-gray-900 '
                        } block rounded-md py-2 px-3 text-base font-medium`}
                        aria-current={
                          router.asPath === item.url ? 'page' : undefined
                        }
                      >
                        {item.text}
                      </Disclosure.Button>
                    </a>
                  </button>
                ) : (
                  <Link key={item.id} href={item.url}>
                    <a className="!no-underline">
                      <Disclosure.Button
                        className={`${
                          router.asPath === item.url
                            ? '!bg-gray-100 !text-gray-900 '
                            : '!text-gray-900 !hover:bg-gray-50 !hover:text-gray-900 '
                        } block rounded-md py-2 px-3 text-base font-medium`}
                        aria-current={
                          router.asPath === item.url ? 'page' : undefined
                        }
                      >
                        {item.text}
                      </Disclosure.Button>
                    </a>
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="px-4 flex items-center"></div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
