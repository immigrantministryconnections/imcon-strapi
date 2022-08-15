import { fetchAPI } from 'utils/api';

export default function StatePage() {
  return <div>Cities List</div>;
}

export async function getStaticPaths(context) {
  // Get resource Pages from Strapi
  const [cityPages, subcategoryPages] = await Promise.all([
    fetchAPI('/city-regions', {
      fields: ['citySlug'],
      populate: {
        ca_province: { fields: ['provinceSlug'] },
        us_state: { fields: ['stateSlug'] },
        resource: { fields: ['resourceSlug'] },
      },
    }),
    fetchAPI('/subcategories', {
      fields: ['subcategorySlug'],
      populate: {
        resource_category: { fields: ['categorySlug'] },
        resource: { fields: ['resourceSlug'] },
      },
    }),
  ]);

  const allPages = [...cityPages.data, ...subcategoryPages.data];

  const paths = allPages.map((page) => {
    const slug1 =
      page.attributes.us_state?.data?.attributes.stateSlug ||
      page.attributes?.ca_province?.data?.attributes?.provinceSlug ||
      page.attributes?.resource_category?.data?.attributes?.categorySlug;
    const slug2 = page.attributes?.citySlug || page.attributes?.subcategorySlug;
    const resourceSlug =
      page.attributes?.resource?.data?.attributes?.resourceSlug || null;

    return {
      params: {
        resourceSlug,
        slug1,
        slug2,
      },
    };
  });

  console.log(paths[0]);
  console.log(paths[1]);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const { stateSlug } = params;

  let pageData;

  return {
    props: {
      section: null,
      metadata: null,
      global: null,
    },
  };
}
