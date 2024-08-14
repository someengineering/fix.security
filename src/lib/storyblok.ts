import { getStoryblokApi, ISbResult } from '@storyblok/react';

import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import { openGraph } from '@/utils/og';

export const fetchStory = async (slug: string) => {
  const storyblokApi = getStoryblokApi();
  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: isProd ? 'published' : 'draft',
    });
    return data?.story || null;
  } catch (error) {
    return null;
  }
};

export function generateMetadataFromStory(
  story: ISbResult,
  isHomePage: boolean,
) {
  const content = story.data.story.content.seo;
  const title = (content && content.title) || `${siteConfig.title}`;
  const description = content && content.description;
  const url = siteConfig.url;
  const ogImage = openGraph({
    title: siteConfig.tagline,
    description,
  });

  return {
    title: {
      default: isHomePage
        ? `${title} : ${siteConfig.tagline}`
        : `${title} | ${siteConfig.title}`,
      template: isHomePage
        ? `${title} : ${siteConfig.tagline}`
        : `${title} | ${siteConfig.title}`,
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
}
