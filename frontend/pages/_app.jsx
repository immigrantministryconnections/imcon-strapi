import { createContext, useEffect } from 'react';

import { useRouter } from 'next/router';

import App from 'next/app';
import Script from 'next/script';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { DefaultSeo } from 'next-seo';
import { getStrapiMedia } from 'utils/media';
import { getGlobalData, getSignupPage } from 'utils/api';

import * as gtag from '../lib/gtag';

import '@/styles/globals.css';
import { Modal } from 'utils/context/modal-context';

export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  // Extract the data we need
  const { globalData } = pageProps;
  if (globalData == null) {
    return <ErrorPage statusCode={404} />;
  }

  const { defaultSeo, favicon, metaTitleSuffix } =
    globalData.global.data.attributes;

  /**
   * Google analytics things
   */
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
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
      <GlobalContext.Provider
        value={{ global: globalData, mezzaninePage: pageProps.mezzaninePage }}
      >
        <Modal>
          <Component {...pageProps} />
        </Modal>
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (appContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const globalData = await getGlobalData();
  const mezzaninePage = await getSignupPage();

  return {
    ...appProps,
    pageProps: {
      globalData: globalData,
      mezzaninePage: mezzaninePage.data,
    },
  };
};

export default MyApp;
