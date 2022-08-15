import Link from 'next/link';
import { useRouter } from 'next/router';
import NextImage from '@/components/elements/image';

import Seo from '@/components/elements/seo';
import Layout from '@/components/layout';
import { fetchAPI } from 'utils/api';

/**
 * This page is a dynamic page that will render the top-level
 * 'resource' pages. It will display a list of image links to
 * the children 'subdirectory' state / province, city / region,
 * category / subcategory pages.
 */
export default function ResourcesPage({ seo, imageLinks }) {
  const router = useRouter();
  return (
    <Layout>
      <Seo seo={seo} />
      <ul role="list" className="mx-auto">
        {imageLinks.map((imageLink) => {
          const slug =
            imageLink.attributes?.stateSlug ||
            imageLink.attributes?.provinceSlug ||
            imageLink.attributes.categorySlug;
          return (
            <li
              key={imageLink.id}
              className="flex items-center justify-center mx-auto py-4"
            >
              <div className="flex flex-col items-center cursor-pointer">
                <Link
                  as={`${router.asPath}/${slug}`}
                  href={`${router.pathname}/${slug}`}
                >
                  <NextImage
                    media={imageLink.attributes.image}
                    height={200}
                    width={600}
                  />
                </Link>
                <h3 className="font-medium text-lg text-[#1e1e1e]">
                  {imageLink.attributes.name}
                </h3>
              </div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getStaticPaths() {
  /**
   * Loop through all of the resource types in Strapi.
   * ie: local resources, national resources, Canadian resources,
   * etc...
   */
  const pages = await fetchAPI('/resources', { fields: ['resourceSlug'] });

  /**
   * Generate paths for all of these slugs. This will generate the
   * 'top-level direcotories' for resource types
   * ie: https://imcon.church/local-resources
   */
  const paths = pages.data.map((page) => {
    const { resourceSlug } = page.attributes;

    return {
      params: { resourceSlug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const { resourceSlug } = params;

  let pageData;

  switch (resourceSlug) {
    case 'canadian-resources':
      pageData = await fetchAPI('/ca-provinces', {
        field: ['name', 'provinceSlug'],
        populate: ['image'],
      });
      break;
    case 'national-resources':
      pageData = await fetchAPI('/resource-categories', {
        field: ['name', 'categorySlug'],
        populate: ['image'],
      });
      break;
    case 'local-resources':
    default:
      pageData = await fetchAPI('/us-states', {
        field: ['name', 'stateSlug'],
        populate: ['image'],
      });
      break;
  }

  return {
    props: {
      imageLinks: pageData.data,
      metadata: null,
      global: null,
    },
  };
}