import Link from 'next/link';

export default function LinkList({ data }) {
  return (
    <ul className="flex items-center justify-center">
      {data.links?.map((link) => {
        return (
          <li key={`howlink-${link.id}`} className="text-xl tracking-wide">
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
