import Link from 'next/link';

export default function LinkList({ data }) {
  let { links } = data;
  if (data?.type) {
    links = links.filter((link) => link.attributes?.organizationType === type);
  }
  return (
    <ul role="list" className="mx-auto mt-4 space-y-3 lg:max-w-lg">
      {links?.map((link) => {
        const url =
          link?.attributes?.url || link?.attributes?.websiteURL || link.url;
        const text =
          link?.attributes?.text || link?.attributes?.name || link.text;
        return (
          <li
            key={`howlink-${link.id}`}
            className="text-lg text-center shadow-md drop-shadow-lg overflow-hidden px-4 py-4 sm:px-6 rounded-md"
          >
            <Link href={url}>
              <a className="cursor-pointer text-blue-500 hover:text-blue-400 underline">
                {text}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
