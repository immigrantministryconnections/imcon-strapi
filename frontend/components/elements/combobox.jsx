import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ComboBox({ onChange, results }) {
  const router = useRouter();
  const [selectedOrg, setSelectedOrg] = useState();
  const [searchResults, setSearchResults] = useState(results);

  useEffect(() => {
    setSearchResults(results);
  }, [results]);

  return (
    <Combobox
      as="div"
      value={selectedOrg}
      onChange={(org) => router.push(`/organization/${org}`)}
      className="w-full"
    >
      <Combobox.Label className="sr-only block text-sm font-medium text-gray-700">
        Search
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => onChange(event)}
          placeholder="Search"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {searchResults?.results.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {searchResults.results.map((org) => {
              return (
                <Combobox.Option
                  key={org.id}
                  value={org.attributes.orgSlug}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          'block truncate',
                          'cursor-pointer',
                          selected && 'font-semibold'
                        )}
                      >
                        {org.attributes.name}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              );
            })}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
