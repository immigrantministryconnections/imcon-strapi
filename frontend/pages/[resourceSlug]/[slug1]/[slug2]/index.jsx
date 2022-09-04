import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { getSession, useSession, signIn } from 'next-auth/react';

import Layout from '@/components/layout';
import Seo from '@/components/elements/seo';

import { fetchAPI } from 'utils/api';
import LinkList from '@/components/sections/link-list-section';

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

  let orgTypes = [];
  if (orgLinks && orgLinks.length) {
    orgLinks.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
    orgTypes = Array.from(
      new Set(orgLinks.map((org) => org.attributes?.organizationType))
    ).filter((org) => org !== undefined);
  }

  const renderContent = (userSession) => {
    if (userSession) {
      return (
        <>
          <h4 className="text-mediumBlue text-center mt-4 mb-8">
            If you know any ministry organization website that you feel should
            be listed here, please send their Web address to
            <a href="mailto:connect@imcon.church"> connect@imcon.church</a>.
          </h4>
          {router.asPath.includes('bibles-plus-media/media') && (
            <h4 className="text-mediumBlue text-center mt-4 mb-8">
              The organizations on this page provide media in multiple
              languages. For resources focused on one language group, visit our{' '}
              <Link href="/national-resources/peoplegroups">
                <a>Serving Specific People Groups</a>
              </Link>{' '}
              page
            </h4>
          )}
          {orgTypes.map((type) => (
            <>
              <h2 className="mx-auto text-mediumBlue mb-4 text-center">
                {type}
              </h2>
              <LinkList links={orgLinks} type={type} />
            </>
          ))}
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
