import { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { signIn, getSession } from 'next-auth/react';

import { LockClosedIcon } from '@heroicons/react/outline';

import NextImage from '@/components/elements/image';
import Seo from '@/components/elements/seo';
import Sections from '@/components/sections';
import Layout from '@/components/layout';
import { fetchAPI, getPageData } from 'utils/api';

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

  const renderContent = (session) => {
    if (!!sections) {
      return <Sections sections={sections} />;
    } else if (session) {
      return (
        <>
          <ul role="list" className="mx-auto">
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
                        <NextImage
                          media={imageLink.attributes.image}
                          height={200}
                          width={600}
                        />
                      </a>
                    </Link>
                    <h3 className="font-medium text-lg text-[#1e1e1e]">
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
      <button
        onClick={signIn}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mediumBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
        Sign in to view this content
      </button>;
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

  if (pageData === null) return { props: {} };

  return {
    props: {
      imageLinks: pageData.data,
      seo: pageData.attributes?.seo || null,
      global: null,
    },
  };
}
