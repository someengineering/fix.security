import { Metadata } from 'next';

import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import { openGraph } from '@/utils/og';

const url = siteConfig.url;
const title = siteConfig.title;
const description = siteConfig.description;
const ogImage = openGraph({
  title: siteConfig.tagline,
  description,
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
        { url: '/blog/rss.xml', title: 'Fix Security blog RSS feed' },
      ],
      'application/atom+xml': [
        { url: '/blog/atom.xml', title: 'Fix Security blog Atom feed' },
      ],
      'application/json': [
        { url: '/blog/feed.json', title: 'Fix Security blog JSON feed' },
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
