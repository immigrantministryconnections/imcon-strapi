import React from 'react';

import Link from 'next/link';

import Blocks from 'editorjs-blocks-react-renderer';

import Seo from '@/components/elements/seo';
import Layout from '@/components/layout';
import NextImage from '@/components/elements/image';

import { fetchAPI } from 'utils/api';

export default function OrgPage({ org }) {
  const { name, description, logo, websiteURL, contact } = org.attributes;
  const seo = {
    metaTitle: name,
    metaDescription: description,
    shareImage: logo,
  };

  return (
    <Layout>
      <Seo metadata={seo} />

      <div className="max-w-lg mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
        <Link href={websiteURL} passHref={true}>
          <div>
            <NextImage $className="rounded-t-lg" media={logo} />
          </div>
        </Link>
        <div className="p-5">
          <Link href={websiteURL}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 cursor-pointer">
              {name}
            </h5>
          </Link>
          <div className="mb-4">
            <Blocks
              data={JSON.parse(description)}
              config={{
                code: {
                  className: 'language-js my-16',
                },
                delimiter: {
                  className: 'border border-2 w-16 mx-auto',
                },
                embed: {
                  className: 'border-0',
                },
                header: {
                  className: 'font-bold',
                },
                image: {
                  className: 'w-full max-w-screen-md',
                  actionsClassNames: {
                    stretched: 'w-full h-80 object-cover',
                    withBorder: 'border border-2',
                    withBackground: 'p-2',
                  },
                },
                list: {
                  className: 'list-inside',
                },
                paragraph: {
                  className: 'text-base text-opacity-75',
                  actionsClassNames: {
                    alignment: 'text-{alignment}', // This is a substitution placeholder: left or center.
                  },
                },
                quote: {
                  className: 'py-3 px-5 italic font-serif',
                },
                table: {
                  className: 'table-auto',
                },
              }}
            />
          </div>
          <Link
            href={contact}
            classNameName="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-mediumBlue rounded-lg hover:bg-darkBlue focus:ring-4 focus:outline-none focus:ring-lightBlue"
          >
            Contact this organization
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const orgs = await fetchAPI('/orgs', { fields: ['orgSlug'] });

  const paths = orgs.data.map((org) => {
    return {
      params: {
        org: org.attributes.orgSlug,
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
  const { org } = params;

  const orgData = await fetchAPI('/orgs', {
    populate: '*',
    filters: { orgSlug: { $eq: org } },
  });

  return {
    props: { org: orgData.data[0] },
  };
}

OrgPage.auth = true;
