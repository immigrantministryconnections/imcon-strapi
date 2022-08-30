import React from 'react';

import Seo from '@/components/elements/seo';
import Layout from '@/components/layout';
import OrgCard from '@/components/elements/org-card';

import { fetchAPI } from 'utils/api';

export default function OrgPage({ org }) {
  const { name, description, logo } = org.attributes;
  const seo = {
    metaTitle: name,
    metaDescription: description,
    shareImage: logo,
  };

  return (
    <Layout>
      <Seo metadata={seo} />
      <OrgCard org={org} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const orgs = await fetchAPI('/orgs', {
    fields: ['orgSlug'],
    pagination: { page: 1, pageSize: 2000 },
  });

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
  const { params, preview } = context;
  const { org } = params;

  const orgData = await fetchAPI('/orgs', {
    populate: '*',
    publicationState: preview ? 'preview' : 'live',
    filters: { orgSlug: { $eq: org } },
  });

  return {
    props: { org: orgData.data[0] },
  };
}

OrgPage.auth = true;
