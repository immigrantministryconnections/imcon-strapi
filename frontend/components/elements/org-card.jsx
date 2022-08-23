import Link from 'next/link';

import NextImage from './image';
import RichText from './rich-text';

export default function OrgCard({ org }) {
  const { name, description, logo, websiteURL, contact } = org.attributes;

  const orgLink =
    contact.includes('@') && !contact.startsWith('mailto:')
      ? `mailto:${contact}`
      : contact;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
      <Link href={websiteURL} passHref={true}>
        <div>
          <NextImage $className="rounded-t-lg" media={logo} />
        </div>
      </Link>
      <div className="p-5">
        <Link href={websiteURL}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 cursor-pointer">
            {name}
          </h5>
        </Link>
        <div className="mb-4">
          <RichText data={JSON.parse(description)} />
        </div>
        <Link
          href={orgLink}
          classNameName="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-mediumBlue rounded-lg hover:bg-darkBlue focus:ring-4 focus:outline-none focus:ring-lightBlue"
        >
          {contact}
        </Link>
      </div>
    </div>
  );
}
