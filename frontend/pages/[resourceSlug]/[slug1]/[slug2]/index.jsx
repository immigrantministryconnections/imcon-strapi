import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '@/components/layout';
import Seo from '@/components/elements/seo';

import { fetchAPI } from 'utils/api';

export default function StatePage({ orgLinks, seo }) {
  const router = useRouter();

  let orgTypes = [];
  if (orgLinks && orgLinks.length) {
    orgLinks.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
    orgTypes = Array.from(
      new Set(orgLinks.map((org) => org.attributes?.organizationType))
    ).filter((org) => org !== undefined);
  }

  const renderContent = () => {
    return (
      <>
        <h4 className="text-mediumBlue text-center mt-4 mb-8">
          If you know any ministry organization website that you feel should be
          listed here, please send their Web address to
          <a href="mailto:connect@imcon.church"> connect@imcon.church</a>.
        </h4>
        {router.asPath.includes('bibles-plus-media/media') && (
          <h4 className="text-mediumBlue text-center mt-4 mb-8">
            The organizations on this page provide media in multiple languages.
            For resources focused on one language group, visit our{' '}
            <Link href="/national-resources/peoplegroups">
              <a>Serving Specific People Groups</a>
            </Link>{' '}
            page
          </h4>
        )}
        {orgTypes.map((type) => (
          <div key={`orgtype-${type}`}>
            <h2 className="mx-auto text-mediumBlue mb-4 text-center">{type}</h2>
            <ul
              role="list"
              className="mx-auto my-6 space-y-3 lg:max-w-lg !list-none"
            >
              {orgLinks
                ?.filter(
                  (orgLink) => orgLink.attributes?.organizationType === type
                )
                .map((orgLink) => {
                  const slug = orgLink.attributes.orgSlug;
                  return (
                    <li
                      key={orgLink.id}
                      className="shadow-md drop-shadow-lg overflow-hidden px-4 py-4 sm:px-6 rounded-md"
                    >
                      <div className="flex flex-col items-center text-center cursor-pointer">
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
          </div>
        ))}
      </>
    );
  };

  return (
    <Layout>
      <Seo metadata={seo} />
      {renderContent()}
    </Layout>
  );
}

export async function getStaticPaths(context) {
  // Get resource Pages from Strapi
  const [cityPages, subcategoryPages] = await Promise.all([
    fetchAPI('/city-regions', {
      fields: ['citySlug'],
      pagination: {
        page: 1,
        pageSize: 2000,
      },
      populate: {
        ca_province: { fields: ['provinceSlug'] },
        us_state: { fields: ['stateSlug'] },
        resource: { fields: ['resourceSlug'] },
      },
    }),
    fetchAPI('/subcategories', {
      fields: ['subcategorySlug'],
      pagination: {
        page: 1,
        pageSize: 2000,
      },
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
            $eq: slug2.substring(slug2.indexOf('-') + 1),
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
    filters: queryFilter,
    pagination: {
      page: 1,
      pageSize: 1000,
    },
    resource: {
      resourceSlug: {
        $eq: $resourceSlug,
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
