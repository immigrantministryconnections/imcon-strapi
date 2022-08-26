import Link from 'next/link';

import NextImage from './image';
import RichText from './rich-text';

export default function OrgCard({ org }) {
  const { name, description, logo, websiteURL, contact } = org.attributes;

  const orgLink = contact
    ? contact.includes('@') && !contact.startsWith('mailto:')
      ? `mailto:${contact}`
      : contact
    : '';

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
      <div>
        <NextImage $className="rounded-t-lg" media={logo} />
      </div>
      <div className="p-5">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={websiteURL}
          className="!no-underline"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 cursor-pointer !no-underline">
            {name}
          </h5>
        </a>
        <div className="mb-4">
          <a href={websiteURL} target="_blank" rel="noopener noreferrer">
            {websiteURL}
          </a>
        </div>
        <div className="mb-4">
          <RichText data={JSON.parse(description)} />
        </div>
        {contact && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={orgLink}
            classNameName="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-mediumBlue rounded-lg hover:bg-darkBlue focus:ring-4 focus:outline-none focus:ring-lightBlue"
          >
            {contact}
          </a>
        )}
      </div>
    </div>
  );
}
