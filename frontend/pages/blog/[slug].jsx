import Seo from '@/components/elements/seo';
import Layout from '@/components/layout';

import RichText from '@/components/elements/rich-text';

import NextImage from '@/components/elements/image';

import { fetchAPI } from 'utils/api';

export default function Post({ article }) {
  const { title, content, description, author, image } = article.attributes;
  const seo = {
    metaTitle: title,
    metaDescription: description,
    shareImage: image,
  };
  return (
    <Layout>
      <Seo metadata={seo} />
      <article>
        <h1>{title}</h1>
        <NextImage media={image} />
        <div className="my-4">
          By:{' '}
          {`${
            author?.data?.attributes?.name || 'Immigrant Ministry Connections'
          }`}
        </div>
        <div>
          <RichText data={JSON.parse(content)} />
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const blogSlugs = await fetchAPI('/blog-posts', { fields: ['slug'] });

  const paths = blogSlugs.data.map((post) => {
    const { slug } = post.attributes;
    return { params: { slug } };
  });
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const pageData = await fetchAPI('/blog-posts', {
    populate: '*',
    filters: { slug: { $eq: slug } },
  });

  return { props: { article: pageData.data[0] } };
}
