import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '@/components/layout';
import Seo from '@/components/elements/seo';
import NextImage from '@/components/elements/image';

import { fetchAPI } from 'utils/api';

export default function StatePage({ seo, imageLinks, orgLinks }) {
  const router = useRouter();
  return (
    <Layout>
      <Seo seo={seo} />
      {imageLinks?.map((imageLink) => {
        const { image, name } = imageLink.attributes;
        const slug =
          imageLink.attributes?.citySlug || imageLink.attributes?.categorySlug;
        return (
          <Link
            as={`${router.asPath}/${slug}`}
            href={`${router.pathname}/${slug}`}
          >
            <div key={imageLink.id}>{name}</div>
          </Link>
        );
      })}
      {orgLinks && (
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
                    as={`${router.asPath}/${slug}`}
                    href={`${router.pathname}/${slug}`}
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
      )}
    </Layout>
  );
}

export async function getStaticPaths(context) {
  // Get resource Pages from Strapi
  const [statePages, provincePages, categoryPages] = await Promise.all([
    fetchAPI('/us-states', {
      fields: ['stateSlug'],
      populate: { resource: { fields: ['resourceSlug'] } },
    }),
    fetchAPI('/ca-provinces', {
      fields: ['provinceSlug'],
      populate: { resource: { fields: ['resourceSlug'] } },
    }),
    fetchAPI('/resource-categories', {
      fields: ['categorySlug'],
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

  // Get all the orgs that belong at this level
  pageOrgs = await fetchAPI('/orgs', {
    populate: '*',
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
        {
          resource_category: {
            categorySlug: {
              $eq: slug1,
            },
          },
        },
      ],
      resource: {
        resourceSlug: {
          $eq: $resourceSlug,
        },
      },
    },
  });

  // switch (resourceSlug) {
  //   case 'national-resources':
  //     pageData = await fetchAPI('/resource-categories', {
  //       fields: ['name', 'categorySlug'],
  //       populate: ['image'],
  //     });
  //     break;
  //   case 'local-resources':
  //   case 'canadian-resources':
  //   default:
  //     [pageData, orgs] = await Promise.all([
  //       fetchAPI('/city-regions', {
  //         fields: ['name', 'citySlug'],
  //         populate: ['us_state', 'ca_province', 'image'],
  //         filters: {
  //           $or: [
  //             {
  //               $and: [
  //                 {
  //                   us_state: {
  //                     stateSlug: {
  //                       $eq: slug1,
  //                     },
  //                   },
  //                 },
  //                 {
  //                   citySlug: {
  //                     $startsWith: 'statewide',
  //                   },
  //                 },
  //               ],
  //             },
  //             {
  //               $and: [
  //                 {
  //                   ca_province: {
  //                     provinceSlug: {
  //                       $eq: slug1,
  //                     },
  //                   },
  //                 },
  //                 {
  //                   citySlug: {
  //                     $startsWith: 'statewide',
  //                   },
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       }),
  //       fetchAPI('/org', {
  //         populate: '*',
  //         filters: {

  //         }
  //       }),
  //     ]);
  //     break;
  // }

  return {
    props: {
      imageLinks: null,
      orgLinks: pageOrgs.data,
      metadata: null,
      global: null,
    },
  };
}
