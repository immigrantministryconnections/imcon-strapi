import { useRouter } from 'next/router';

import Layout from '@/components/layout';
import Seo from '@/components/elements/seo';
import BlogPosts from '@/components/sections/blog-posts';

import { fetchAPI } from 'utils/api';

export default function BlogPage({ posts, seo, page, pageCount }) {
  const router = useRouter();

  return (
    <Layout>
      <Seo metadata={seo} />
      <BlogPosts posts={posts} />
      {/* <div className="flex flex-row item-center justify-center gap-x-4 mb-24 mt-4">
        <button
          className={`rounded w-20 px-2 py-1 ${
            page <= 1 ? 'bg-gray-200' : 'bg-mediumBlue'
          } text-white`}
          disabled={page <= 1}
          onClick={() => router.push(`/blog?page=${page - 1}`)}
        >
          Previous
        </button>
        <div>{`${page} / ${pageCount}`}</div>
        <button
          className={`rounded w-20 px-2 py-1 ${
            page >= pageCount ? 'bg-gray-200' : 'bg-mediumBlue'
          } text-white`}
          disabled={page >= pageCount}
          onClick={() => router.push(`/blog?page=${page + 1}`)}
        >
          Next
        </button>
      </div> */}
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const postData = await fetchAPI('/blog-posts', {
    populate: '*',
    pagination: { page, pageSize: 2000 },
    sort: ['publishedAt:desc'],
  });
  return {
    props: {
      posts: postData.data,
      page: +page,
      pageCount: postData.meta.pagination.pageCount,
    },
  };
}
