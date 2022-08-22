import React from 'react';

import Link from 'next/link';

import Seo from '@/components/elements/seo';
import Layout from '@/components/layout';
import NextImage from '@/components/elements/image';

import { fetchAPI } from 'utils/api';
import RichText from '@/components/elements/rich-text';

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
            <RichText data={JSON.parse(description)} />
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
