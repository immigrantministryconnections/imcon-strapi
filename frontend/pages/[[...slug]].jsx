import { useRouter } from 'next/router';
import { fetchAPI, getPageData } from 'utils/api';

import Sections from '@/components/sections';
import Seo from '@/components/elements/seo';
import Layout from '@/components/layout';
import Custom404 from './404';

export default function Page({ seo, sections, showSignupForm, preview }) {
  const router = useRouter();

  // Check if the required data was provided
  // if (!router.isFallback && !sections?.length) {
  //   return <Custom404 statusCode={404} />;
  // }

  // // Loading screen (only possible in preview mode)
  // if (router.isFallback) {
  //   return <div className="container">Loading...</div>;
  // }
  return (
    <Layout showSignup={showSignupForm}>
      <Seo metadata={seo} />
      <Sections sections={sections} preview={preview} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const pages = await fetchAPI('/top-level-pages', {
    fields: ['slug'],
  });
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
  const { params, preview = null } = context;

  const pageData = await getPageData({
    slug: (!params.slug ? [''] : params.slug).join('/'),
    preview,
  });

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} };
  }

  const { sections, seo, showSignupForm } = pageData.attributes;

  return {
    props: {
      sections,
      showSignupForm,
      preview,
      seo,
    },
  };
}
