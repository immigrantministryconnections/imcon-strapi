import Link from 'next/link';

import PropTypes from 'prop-types';

export default function LinkList({ links, type }) {
  if (type) {
    links.filter((link) => link.attributes?.organizationType === type);
  }
  return (
    <ul role="list" className="mx-auto my-6 space-y-3 lg:max-w-lg">
      {links.map((link) => {
        const slug = link.attributes.orgSlug;
        return (
          <li
            key={link.id}
            className="shadow overflow-hidden px-4 py-4 sm:px-6 rounded-md bg-imconOrange/20"
          >
            <div className="flex flex-col items-center text-center cursor-pointer">
              <Link as={`/organization/${slug}`} href={`/organization/${slug}`}>
                <a className="font-medium text-lg text-blue-500 hover:text-blue-400 underline">
                  {link.attributes.name}
                </a>
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

PropTypes.LinkList = {
  links: PropTypes.array.isRequired,
  type: PropTypes.string,
};
