import { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { CookiesProvider } from 'next-client-cookies/server';
import PlausibleProvider from 'next-plausible';

import '@/styles/globals.css';

import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { plusJakartaSans } from '@/app/fonts';
import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import { GTM_CONTAINER_ID } from '@/constants/google';
import { openGraph } from '@/utils/og';

const url = siteConfig.url;
const title = siteConfig.title;
const description = siteConfig.description;
const ogImage = openGraph({
  title: siteConfig.tagline,
  description: url,
});

export const metadata: Metadata = {
  title: {
    default: `${title}: ${siteConfig.tagline}`,
    template: `%s | ${title}`,
  },
  description,
  robots: isProd
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/blog/rss.xml', title: 'Fix blog RSS feed' },
      ],
      'application/atom+xml': [
        { url: '/blog/atom.xml', title: 'Fix blog Atom feed' },
      ],
      'application/json': [
        { url: '/blog/feed.json', title: 'Fix blog JSON feed' },
      ],
    },
  },
  openGraph: {
    url,
    title,
    description,
    siteName: title,
    images: [ogImage],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: '#3d58d3',
  colorScheme: 'only light',
};

const gtmScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied'
});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
`;

const consentScript = `
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'analytics_storage': 'granted'
});
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const consent = cookieStore.get('cookie_consent')?.value === 'true';

  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <head>
        <PlausibleProvider domain="fix.security" />
      </head>
      <body className="bg-white">
        <CookiesProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          {GTM_CONTAINER_ID ? (
            <>
              <Script
                id="gtm"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: gtmScript,
                }}
              />
              {consent ? (
                <>
                  <Script
                    id="consent"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: consentScript,
                    }}
                  />
                </>
              ) : (
                <CookieConsent />
              )}
            </>
          ) : null}
        </CookiesProvider>
      </body>
    </html>
  );
}
