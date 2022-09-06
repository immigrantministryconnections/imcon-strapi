import NextImage from '@/components/elements/image';
import Link from 'next/link';

import format from 'date-fns/format';

export default function BlogPosts({ posts }) {
  return (
    <div className="relative text-darkBlue bg-gray-50 pt-8 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl text-darkBlue tracking-tight font-bold  sm:text-4xl sm:tracking-tight">
            From the Blog
          </h2>
        </div>
        <ul role="list" className="mx-auto mt-4 space-y-3 lg:max-w-lg">
          {posts.map((post) => {
            const { slug } = post.attributes;
            return (
              <li
                key={post.id}
                className="shadow-md drop-shadow-lg overflow-hidden px-4 py-4 sm:px-6 rounded-md"
              >
                <div className="flex flex-col items-center text-center cursor-pointer">
                  <Link as={`/blog/${slug}`} href={`/blog/${slug}`}>
                    <a className="font-medium text-lg text-blue-500 hover:text-blue-400 underline">
                      {post.attributes.title}
                    </a>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
