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
  const resources = await fetchAPI('/resources', { fields: ['resourceSlug'] });

  const resourceSlugs = resources.data.map(
    (resource) => resource.attributes.resourceSlug
  );

  const paths = pages.data
    .map((page) => {
      const { slug } = page.attributes;
      // Decompose the slug that was saved in Strapi
      if (!resourceSlugs.includes(slug)) {
        const slugArray = !slug ? false : slug.split('/');
        return {
          params: { slug: slugArray },
        };
      } else return;
    })
    .filter((param) => param !== undefined);
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

  return {
    props: {
      sections,
      seo,
    },
  };
}
