import { fetchAPI, getPageData } from 'utils/api';

import Sections from '@/components/sections';
import Seo from '@/components/elements/seo';
import Layout from '@/components/layout';

export default function Page({ seo, sections }) {
  return (
    <Layout>
      <Seo metadata={seo} />
      <Sections sections={sections} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const pages = await fetchAPI('/top-level-pages', { fields: ['slug'] });

  const paths = pages.data.map((page) => {
    const { slug } = page.attributes;
    console.log({ slug });
    // Decompose the slug that was saved in Strapi
    const slugArray = !slug ? false : slug.split('/');
    return {
      params: { slug: slugArray },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;

  const pageData = await getPageData({
    slug: (!params.slug ? [''] : params.slug).join('/'),
  });

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} };
  }

  const { sections, seo } = pageData.attributes;

  console.log({ sections });

  return {
    props: {
      sections,
      seo,
    },
  };
}
