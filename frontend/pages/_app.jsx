import { createContext, useState } from 'react';

import { SessionProvider, useSession } from 'next-auth/react';

import App from 'next/app';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { DefaultSeo } from 'next-seo';
import { getStrapiMedia } from 'utils/media';
import { getGlobalData } from 'utils/api';

import '@/styles/globals.css';
import { Modal } from 'utils/context/modal-context';

export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  // Extract the data we need
  const { globalData } = pageProps;
  if (globalData == null) {
    return <ErrorPage statusCode={404} />;
  }

  const { defaultSeo, favicon, metaTitleSuffix } = globalData.attributes;

  return (
    <>
      {/* Favicon */}
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(favicon.data.attributes.url)}
        />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${metaTitleSuffix}`}
        title={defaultSeo.metaTitle}
        description={defaultSeo.metaDescription}
        openGraph={{
          images: Object.values(
            defaultSeo.shareImage.data.attributes.formats
          ).map((image) => {
            return {
              url: getStrapiMedia(image.url),
              width: image.width,
              height: image.height,
            };
          }),
        }}
        twitter={{
          cardType: defaultSeo.twitterCardType,
          handle: defaultSeo.twitterUsername,
        }}
      />
      {/* Display the content */}
      <SessionProvider session={session}>
        <GlobalContext.Provider value={{ global: globalData.attributes }}>
          <Modal>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Modal>
        </GlobalContext.Provider>
      </SessionProvider>
    </>
  );
};

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (appContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const globalData = await getGlobalData();

  return {
    ...appProps,
    pageProps: {
      globalData: globalData.data,
    },
  };
};

export default MyApp;
