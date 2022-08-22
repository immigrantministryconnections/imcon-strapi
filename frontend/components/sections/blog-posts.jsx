import NextImage from '@/components/elements/image';
import Link from 'next/link';

import format from 'date-fns/format';

export default function BlogPosts({ posts }) {
  return (
    <div className="relative bg-gray-50 pt-8 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl sm:tracking-tight">
            From the Blog
          </h2>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {posts.map((post) => (
            <div
              key={`${post.attributes.title}-${post.id}`}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <NextImage
                  // className="h-48 w-full object-cover"
                  media={post.attributes.image}
                  alt=""
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  {/* <p className="text-sm font-medium text-indigo-600">
                    <Link href={`/blog/${post.attributes.slug}`}>
                      <a className="hover:underline">{post.category.name}</a>
                    </Link>
                  </p> */}
                  <Link href={`/blog/${post.attributes.slug}`}>
                    <a className="block mt-2 !no-underline">
                      <p className="text-xl font-semibold text-gray-900">
                        {post.attributes.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {post.attributes?.description}
                      </p>
                    </a>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">
                      {`${
                        post.attributes?.author?.data?.attributes?.name ||
                        'Immigrant Ministry Connections'
                      } `}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      <span className="hover:underline">
                        {`${
                          post.attributes?.author?.data?.attributes?.name ||
                          'Immigrant Ministry Connections'
                        } `}
                      </span>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.attributes.publishedAt}>
                        {format(new Date(post.attributes.publishedAt), 'PPP')}
                      </time>
                      {/* <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
