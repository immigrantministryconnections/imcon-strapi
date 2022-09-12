import { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { signIn, getSession } from 'next-auth/react';

import NextImage from '@/components/elements/image';
import Seo from '@/components/elements/seo';
import Sections from '@/components/sections';
import Layout from '@/components/layout';
import { fetchAPI } from 'utils/api';

/**
 * This page is a dynamic page that will render the top-level
 * 'resource' pages. It will display a list of image links to
 * the children 'subdirectory' state / province, city / region,
 * category / subcategory pages.
 */
export default function ResourcesPage({ seo, imageLinks, sections }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const sessionRes = async () => {
      const session = await getSession();
      setSession(session);
      setLoading(false);
    };
    sessionRes();
  }, []);

  // Sort alphabetically
  if (imageLinks && imageLinks.length) {
    if (imageLinks[0].attributes?.order) {
      // Sort by order field if we have one
      imageLinks.sort(
        (a, b) => a.attributes?.order || 0 - b.attributes?.order || 0
      );
    } else {
      imageLinks.sort((a, b) => {
        const aName = a.attributes.name || a.attributes.title;
        const bName = b.attributes.name || b.attributes.title;
        return aName.localeCompare(bName);
      });
    }
  }

  const renderContent = (session) => {
    if (!!sections) {
      return <Sections sections={sections} />;
    } else if (session) {
      return (
        <>
          <ul
            role="list"
            className={`grid ${
              imageLinks?.length > 2 && 'lg:grid-cols-3 lg:gap-x-3'
            }   mx-auto`}
          >
            {imageLinks?.map((imageLink) => {
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
                      <a>
                        {imageLink.attributes.image && (
                          <NextImage
                            media={imageLink.attributes.image}
                            height={200}
                            width={600}
                          />
                        )}
                      </a>
                    </Link>
                    <h3
                      className={`font-bold text-2xl text-mediumBlue text-center`}
                    >
                      {imageLink.attributes.name || imageLink.attributes.title}
                    </h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      );
    } else {
      signIn();
    }
  };

  return (
    <Layout>
      <Seo metadata={seo} />
      {loading ? <></> : renderContent(session)}
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
        pagination: {
          page: 1,
          pageSize: 2000,
        },
        populate: ['image'],
      });
      break;
    case 'national-resources':
      pageData = await fetchAPI('/resource-categories', {
        field: ['name', 'categorySlug'],
        pagination: {
          page: 1,
          pageSize: 2000,
        },
        populate: ['image'],
      });
      break;
    case 'local-resources':
      pageData = await fetchAPI('/us-states', {
        field: ['name', 'stateSlug'],
        pagination: {
          page: 1,
          pageSize: 2000,
        },
        populate: ['image'],
      });
      break;
    default:
      pageData = null;
  }

  if (pageData === null) return { props: {} };

  return {
    props: {
      imageLinks: pageData.data,
      seo: pageData.attributes?.seo || null,
      global: null,
    },
  };
}
