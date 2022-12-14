import { useState, useCallback } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import NextImage from './image';
import ComboBox from './combobox';

import { useModalContext, MODAL_TYPES } from 'utils/context/modal-context';

import { throttle } from 'lodash';

export default function Navbar({ navbar }) {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState();
  const { showModal } = useModalContext();

  const sendQuery = async (query) => {
    const resultsRes = await fetch(`/api/search?q=${query}`);
    const data = await resultsRes.json();
    setSearchResults(data);
  };

  const delayedSearch = useCallback(
    throttle((q) => sendQuery(q), 800),
    []
  );

  const onSearchChange = (event) => {
    delayedSearch(event.target.value);
  };

  return (
    <Disclosure as="header" className="bg-white shadow sticky top-0 z-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 pt-8 sm:px-4 lg:divide-gray-200 lg:px-8">
            <div className="flex justify-center h-20">
              <div className="relative z-10 px-2 flex lg:px-0">
                <div className="flex-shrink-0 flex items-center pt-2">
                  {navbar?.logo && (
                    <Link href={'/'}>
                      <div className="cursor-pointer h-auto w-[400px]">
                        <NextImage cover={true} media={navbar.logo} />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="relative h-16 flex justify-between">
              {
                <div className="relative z-0 flex items-center justify-center sm:inset-0 w-1/3">
                  <ComboBox results={searchResults} onChange={onSearchChange} />
                </div>
              }
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mediumBlue">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <nav
              className="hidden lg:py-2 lg:flex lg:items-center lg:space-x-8 lg:justify-between"
              aria-label="Global"
            >
              <div>
                {navbar?.link?.map((item) => {
                  return (
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
              </div>
            </nav>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="pt-2 pb-3 px-2 space-y-1">
              {navbar?.link?.map((item) => {
                return (
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
