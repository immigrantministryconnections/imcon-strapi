import { useContext } from 'react';

import Layout from '@/components/layout';
import Seo from '@/components/elements/seo';
import BlogPosts from '@/components/sections/blog-posts';

import { GlobalContext } from 'pages/_app';
import { fetchAPI } from 'utils/api';

export default function BlogPage({ posts, seo }) {
  return (
    <Layout>
      <Seo seo={seo} />
      <BlogPosts posts={posts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const postData = await fetchAPI('/blog-posts', {
    populate: '*',
    pagination: { page: 1, pageSize: 100 },
  });
  return {
    props: {
      posts: postData.data,
    },
  };
}
