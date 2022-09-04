import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { getSession, signIn, useSession } from 'next-auth/react';

import Layout from '@/components/layout';
import Seo from '@/components/elements/seo';
import NextImage from '@/components/elements/image';

import { fetchAPI } from 'utils/api';
import Sections from '@/components/sections';
import LinkList from '@/components/sections/link-list-section';

export default function StatePage({
  seo,
  imageLinks,
  subcatLinks,
  orgLinks,
  slug1,
  stateData,
  sections,
}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState(session);
  const router = useRouter();

  // Get the unique 'org types' so that we can separate them
  // into sections.
  let orgTypes = [];
  if (orgLinks && orgLinks.length) {
    orgLinks.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
    orgTypes = Array.from(
      new Set(orgLinks.map((org) => org.attributes?.organizationType))
    ).filter((org) => org !== undefined);
  }

  // Sort alphabetically
  imageLinks &&
    imageLinks.length &&
    imageLinks.sort((a, b) => {
      const aName = a.attributes.name || a.attributes.title;
      const bName = b.attributes.name || b.attributes.title;
      return aName.localeCompare(bName);
    });

  // If they have an order field, sort by order
  imageLinks &&
    imageLinks.length &&
    imageLinks.attributes?.order &&
    imageLinks.sort((a, b) => a.attributes.order - b.attributes.order);

  useEffect(() => {
    const sessionRes = async () => {
      const session = await getSession();
      setUserSession(session);
      setLoading(false);
    };
    sessionRes();
  }, [session]);

  const renderContent = (userSession) => {
    if (!!sections) {
      return <Sections sections={sections} />;
    } else if (userSession) {
      return (
        <>
          <h4 className="text-mediumBlue text-center mt-4 mb-8">
            If you know any ministry organization website that you feel should
            be listed here, please send their Web address to
            <a href="mailto:connect@imcon.church"> connect@imcon.church</a>.
          </h4>
          {router.asPath.includes('peoplegroups') && (
            <h4 className="text-mediumBlue text-center mt-4 mb-8">
              This page lists resources for individual people groups. For other
              ministry resources in multiple languages, visit our{' '}
              <Link href="/national-resources/bibles-plus-media/media">
                <a>Disciple Making Media page</a>
              </Link>
            </h4>
          )}

          {!!imageLinks?.length && (
            <ul
              role="list"
              className={`grid ${
                imageLinks.length > 2 && 'lg:grid-cols-3 lg:gap-x-3'
              } mx-auto`}
            >
              {stateData && (
                <li
                  key={`statewide-${slug1}`}
                  className="flex items-center justify-center mx-auto py-4"
                >
                  <div className="flex flex-col items-center cursor-pointer">
                    <Link
                      as={`${router.asPath}/statewide-${slug1}`}
                      href={`${router.pathname}/statewide-${slug1}`}
                    >
                      <a>
                        <NextImage
                          media={stateData.stateImage}
                          height={200}
                          width={600}
                        />
                      </a>
                    </Link>
                    <h3 className="font-medium text-lg text-[#1e1e1e]">
                      {`${stateData.stateName} Statewide Resources`}
                    </h3>
                  </div>
                </li>
              )}

              {imageLinks.map((imageLink) => {
                const slug =
                  imageLink.attributes?.citySlug ||
                  imageLink.attributes?.categorySlug ||
                  imageLink.attributes?.subcategorySlug;
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
                        {imageLink.attributes?.name ||
                          imageLink.attributes?.title}
                      </h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {!stateData &&
            orgTypes.map((type) => (
              <>
                <h2 className="mx-auto mb-4 text-center text-mediumBlue">
                  {type}
                </h2>
                <LinkList orgLinks={orgLinks} type={type} />
              </>
            ))}
          {subcatLinks && <LinkList orgLinks={subcatLinks} />}
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
  const [statePages, provincePages, categoryPages] = await Promise.all([
    fetchAPI('/us-states', {
      fields: ['stateSlug'],
      pagination: { page: 1, pageSize: 1000 },
      populate: { resource: { fields: ['resourceSlug'] } },
    }),
    fetchAPI('/ca-provinces', {
      fields: ['provinceSlug'],
      pagination: { page: 1, pageSize: 1000 },
      populate: { resource: { fields: ['resourceSlug'] } },
    }),
    fetchAPI('/resource-categories', {
      fields: ['categorySlug'],
      pagination: { page: 1, pageSize: 1000 },
      populate: { resource: { fields: ['resourceSlug'] } },
    }),
  ]);

  const allPages = [
    ...statePages.data,
    ...provincePages.data,
    ...categoryPages.data,
  ];

  const paths = allPages.map((page) => {
    const slug =
      page.attributes?.stateSlug ||
      page.attributes?.provinceSlug ||
      page.attributes?.categorySlug;
    const { resourceSlug } = page.attributes.resource.data.attributes;

    return {
      params: { resourceSlug, slug1: slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const { slug1 } = params;
  const $resourceSlug = params.resourceSlug;

  let pageTiles, pageOrgs;
  let stateData = null;
  let hasCityOrgs = false;

  // Get all the orgs that belong at this level
  pageOrgs = await fetchAPI('/orgs', {
    populate: '*',
    filters: {
      resource: {
        resourceSlug: {
          $eq: $resourceSlug,
        },
      },
      $or: [
        {
          us_state: {
            stateSlug: {
              $eq: slug1,
            },
          },
        },
        {
          ca_province: {
            provinceSlug: {
              $eq: slug1,
            },
          },
        },
        {
          resource_category: {
            categorySlug: {
              $eq: slug1,
            },
          },
        },
      ],
    },
  });

  pageOrgs.data.map((org) => {
    return org.id;
  });

  /**
   * Get an links (tiles) for subcategories or
   * cities.
   */
  switch ($resourceSlug) {
    case 'national-resources':
      pageTiles = await fetchAPI('/subcategories', {
        populate: '*',
        pagination: {
          page: 1,
          pageSize: 1000,
        },
        filters: {
          resource_category: {
            categorySlug: {
              $eq: slug1,
            },
          },
        },
      });
      break;
    case 'local-resources':
    case 'canadian-resources':
    default:
      pageTiles = await fetchAPI('/city-regions', {
        field: ['name', 'citySlug'],
        populate: ['us_state', 'ca_province', 'image', 'orgs'],
        pagination: {
          page: 1,
          pageSize: 1000,
        },
        filters: {
          $or: [
            {
              us_state: {
                stateSlug: {
                  $eq: slug1,
                },
              },
            },
            {
              ca_province: {
                provinceSlug: {
                  $eq: slug1,
                },
              },
            },
          ],
        },
      });
      break;
  }

  pageTiles.data.forEach((tile) => {
    if (tile.attributes.orgs.data.length) {
      hasCityOrgs = true;
    }
  });

  /**
   * If this is a state route and we have cities and
   * listings - we need to show a 'statewide' resources
   * link with the image for the state. Canadian provinces
   * should only have listings - no cities.
   */

  if (
    hasCityOrgs &&
    pageOrgs.data.length &&
    $resourceSlug === 'local-resources'
  ) {
    const stateDataRes = await fetchAPI('/us-states', {
      field: ['image', 'name'],
      populate: ['image'],
      pagination: {
        page: 1,
        pageSize: 1000,
      },
      filters: {
        stateSlug: {
          $eq: slug1,
        },
      },
    });
    stateData = stateDataRes.data[0];
  }

  return {
    props: {
      slug1,
      stateData: stateData && {
        stateImage: stateData.attributes.image,
        stateName: stateData.attributes.name,
      },
      imageLinks:
        hasCityOrgs && $resourceSlug === 'local-resources'
          ? pageTiles.data.filter(
              (pageTile) => pageTile.attributes.orgs.data.length
            )
          : pageTiles.data,
      subcatLinks: [],
      orgLinks: pageOrgs.data,
      metadata: null,
      global: null,
    },
  };
}
