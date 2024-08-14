import { apiPlugin, storyblokInit } from '@storyblok/react';
import { Viewport } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import PlausibleProvider from 'next-plausible';
import React, { Suspense } from 'react';

import '@/styles/main.scss';

import { plusJakartaSans } from '@/app/fonts';
import PosthogPageView from '@/components/analytics/PosthogPageView';
import BlogNewsletterForm from '@/components/blog/BlogNewsletterForm';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import PosthogProvider from '@/providers/posthog';
import StoryblokProvider from '@/providers/StoryblokProvider';

import components from '../../storyblok';

storyblokInit({
  accessToken: process.env.STORYBLOK_OAUTH_TOKEN,
  use: [apiPlugin],
  components,
});

export const viewport: Viewport = {
  themeColor: '#3d58d3',
  colorScheme: 'only light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = headers().get('x-nonce') ?? undefined;

  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <head>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={process.env.COOKIEBOT_ID}
          data-blockingmode="auto"
          type="text/javascript"
          strategy="afterInteractive"
        />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.GOOGLE_TAG_MANAGER_CODE}');
              `,
          }}
        />
        <PlausibleProvider domain="fix.security" scriptProps={{ nonce }} />
      </head>
      <body className="bg-white">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER_CODE}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <PosthogProvider>
          <Header />
          <main>
            <StoryblokProvider>{children}</StoryblokProvider>
            <Suspense>
              <BlogNewsletterForm nonce={nonce} />
            </Suspense>
          </main>
          <Footer />
          <Suspense>
            <PosthogPageView />
          </Suspense>
        </PosthogProvider>
      </body>
    </html>
  );
}
