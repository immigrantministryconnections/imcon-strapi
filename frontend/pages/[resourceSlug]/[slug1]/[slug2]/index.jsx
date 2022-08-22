import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { getSession, useSession, signIn } from 'next-auth/react';

import Layout from '@/components/layout';
import Seo from '@/components/elements/seo';

import { fetchAPI } from 'utils/api';

export default function StatePage({ orgLinks, seo }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState(session);
  const router = useRouter();

  useEffect(() => {
    const sessionRes = async () => {
      const session = await getSession();
      setUserSession(session);
      setLoading(false);
    };
    sessionRes();
  }, [session]);

  const renderContent = (userSession) => {
    if (userSession) {
      return (
        <>
          <ul role="list" className="mx-auto">
            {orgLinks.map((orgLink) => {
              const slug = orgLink.attributes.orgSlug;
              return (
                <li
                  key={orgLink.id}
                  className="flex items-center justify-center mx-auto py-4"
                >
                  <div className="flex flex-col items-center cursor-pointer">
                    <Link
                      as={`/organization/${slug}`}
                      href={`/organization/${slug}`}
                    >
                      <a className="font-medium text-lg text-blue-500 hover:text-blue-400 underline">
                        {orgLink.attributes.name}
                      </a>
                    </Link>
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
      {loading ? <></> : renderContent(userSession)}
    </Layout>
  );
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

  const uniqueStates = Array.from(
    new Set(
      cityPages.data
        .map((page) => page.attributes.us_state?.data?.attributes.stateSlug)
        .filter((page) => page !== undefined)
    )
  );

  const allPages = [
    ...cityPages.data,
    ...subcategoryPages.data,
    ...uniqueStates.map((state) => ({
      attributes: {
        us_state: { data: { attributes: { stateSlug: state } } },
        statewideSlug: `statewide-${state}`,
        resource: { data: { attributes: { resourceSlug: 'local-resources' } } },
      },
    })),
  ];

  const paths = allPages.map((page) => {
    const slug1 =
      page.attributes.us_state?.data?.attributes.stateSlug ||
      page.attributes?.ca_province?.data?.attributes?.provinceSlug ||
      page.attributes?.resource_category?.data?.attributes?.categorySlug;
    const slug2 =
      page.attributes?.citySlug ||
      page.attributes?.subcategorySlug ||
      page.attributes?.statewideSlug;
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

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const { slug2 } = params;
  const $resourceSlug = params.resourceSlug;

  let pageOrgs;

  const queryFilter = slug2.startsWith('statewide-')
    ? {
        us_state: {
          stateSlug: {
            $eq: slug2.split('-')[1],
          },
        },
      }
    : {
        $or: [
          {
            city_region: {
              citySlug: {
                $eq: slug2,
              },
            },
          },
          {
            subcategory: {
              subcategorySlug: {
                $eq: slug2,
              },
            },
          },
        ],
      };

  // Get all the orgs that belong at this level
  pageOrgs = await fetchAPI('/orgs', {
    populate: '*',
    filters: {
      ...queryFilter,
      resource: {
        resourceSlug: {
          $eq: $resourceSlug,
        },
      },
    },
  });

  return {
    props: {
      orgLinks: pageOrgs.data,
      seo: null,
      metadata: null,
      global: null,
    },
  };
}
