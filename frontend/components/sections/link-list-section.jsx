import Link from 'next/link';

export default function LinkList({ links, type }) {
  if (type) {
    links = links.filter((link) => link.attributes?.organizationType === type);
  }
  return (
    <ul role="list" className="mx-auto mt-4 space-y-3 lg:max-w-lg">
      {data.links?.map((link) => {
        return (
          <li
            key={`howlink-${link.id}`}
            className="text-lg text-center shadow overflow-hidden px-4 py-4 sm:px-6 rounded-md bg-imconOrange/20"
          >
            <Link href={link.url}>
              <a className="cursor-pointer text-blue-500 hover:text-blue-400 underline">
                {link.text}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
