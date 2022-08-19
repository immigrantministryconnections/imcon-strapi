import qs from 'qs';

export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData() {
  const gqlEndpoint = getStrapiURL('/graphql');
  const globalRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      fragment FileParts on UploadFileEntityResponse {
        data {
          id
          attributes {
            alternativeText
            width
            height
            mime
            url
            formats
          }
        }
      }
      query GetGlobal {
        global {
          data {
            id
            attributes {
              favicon {
                ...FileParts
              }
              defaultSeo {
                metaTitle
                metaDescription
                shareImage {
                  ...FileParts
                }
                twitterCardType
                twitterUsername
              }
              metaTitleSuffix
              navbar {
                logo {
                  ...FileParts
                }
                link {
                  id
                  url
                  newTab
                  text
                }
                button {
                  id
                  text
                }
              }
              footer {
                logo {
                  ...FileParts
                }
                smallText
                columns {
                  id
                  title
                  links {
                    id
                    url
                    newTab
                    text
                  }
                }
              }
            }
          }
        }
      }  
      `,
    }),
  });

  const global = await globalRes.json();
  return global.data.global;
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The page's slug
 * @param {string} options.locale The current locale specified in router.locale
 * @param {boolean} options.preview router isPreview value
 */
export async function getPageData({ slug, preview }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL('/graphql');
  const pagesRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      fragment FileParts on UploadFileEntityResponse {
        data {
          id
          attributes {
            alternativeText
            width
            height
            mime
            url
            formats
          }
        }
      }
      query GetPages($slug: String!, $publicationState: PublicationState!) {
        topLevelPages(
          filters: { slug: { eq: $slug } }
          publicationState: $publicationState
        ) {
          data {
            id
            attributes {
              pageName
              publishedAt
              slug
              seo {
                metaTitle
                metaDescription
                shareImage {
                  ...FileParts
                }
                twitterCardType
                twitterUsername
              }
              sections {
                __typename
                ... on ComponentSectionsTextSection {
                  id
                  title
                  content
                  centerText
                }
                ... on ComponentSectionsSimpleText {
                  id
                  text {
                    center
                    text
                  }
                }
                ... on ComponentSectionsLinkList {
                  id
                  links {
                    text
                    url
                    newTab
                  }
                }
                ... on ComponentSectionsFeatureRowsGroup {
                  id
                  features {
                    id
                    description
                    link {
                      id
                      newTab
                      text
                      url
                    }
                    media {
                      ...FileParts
                    }
                    title
                  }
                }
                ... on ComponentSectionsFeatureColumnsGroup {
                  id
                  sectionTitle
                  features {
                    title
                    description
                    icon {
                      ...FileParts
                    }
                  }
                }
                ... on ComponentSectionsLeadershipSection {
                  id
                  title
                  memberGroup {
                    title
                    memberInfo {
                      memberName
                      memberBio
                      memberPosition
                      memberLinkUrl
                      memberLinkText
                      memberImage {
                        ...FileParts
                      }
                    }
                  }
                }
                ... on ComponentSectionsEmbeddedForm {
                  id
                  src
                }
                ... on ComponentSectionsImageWithShortText {
                  id
                  sectionTitle
                  richText {
                    body
                  }
                  shortText {
                    text
                  }
                }
                ... on ComponentSectionsImageLinkGrid {
                  id
                  imageLink {
                    text
                    imageLink {
                      url
                      image {
                        ...FileParts
                      }
                    }
                  }
                }
                ...on ComponentSectionsBlogStyleSection {
                  id
                  blogSectionTitle: title
                  author
                    content
                    authorLink {
                      text
                      url
                      newTab
                    }
                }
              }
            }
          }
        }
      } 
      `,
      variables: {
        slug,
        publicationState: preview ? 'PREVIEW' : 'LIVE',
      },
    }),
  });

  // SES const pagesData = await pagesRes.json()
  const { data, errors } = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (data?.topLevelPages == null || data.topLevelPages.data.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return data.topLevelPages.data[0];
}
