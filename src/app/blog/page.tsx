import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import HashnodePageView from '@/components/analytics/HashnodePageView';
import BlogPostList from '@/components/blog/BlogPostList';
import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import { getPosts, getPublication } from '@/lib/hashnode';
import { openGraph } from '@/utils/og';

import { metadata as rootMetadata } from '../metadata';

const url = `${siteConfig.url}/blog`;

export async function generateMetadata(): Promise<Metadata> {
  const publication = await getPublication();

  if (!publication) {
    return {};
  }

  const title = `${publication.title || `${siteConfig.title} Blog`} | ${siteConfig.title}`;
  const description = publication.about?.text;
  const ogImage = openGraph({
    title,
    description,
  });

  return {
    title,
    description,
    alternates: {
      ...rootMetadata.alternates,
      canonical: url,
    },
    openGraph: {
      ...rootMetadata.openGraph,
      url,
      title,
      images: [ogImage],
    },
    twitter: {
      ...rootMetadata.twitter,
      title: `${title} | ${siteConfig.title}`,
      images: [ogImage],
    },
  };
}

export default async function BlogPage() {
  const publicationData = getPublication();
  const postsData = getPosts({});

  const [publication, posts] = await Promise.all([publicationData, postsData]);

  if (!publication || !posts) {
    notFound();
  }

  return (
    <>
      <div className="px-6 py-16 sm:py-24 lg:px-8">
        <div
          className="mx-auto max-w-2xl lg:max-w-4xl"
          itemScope
          itemType="http://schema.org/Blog"
          itemID={url}
        >
          <h1
            className="text-pretty text-4xl font-extrabold sm:text-5xl"
            itemProp="name"
          >
            {publication.title || `${siteConfig.title} Blog`}
          </h1>
          <p
            className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl"
            itemProp="description"
          >
            {publication.about?.text}
          </p>
          {posts ? (
            <BlogPostList
              initialPosts={posts.edges.map((edge) => edge.node)}
              initialPageInfo={posts.pageInfo}
              getPosts={async (after: string) => {
                'use server';

                return await getPosts({ after });
              }}
            />
          ) : null}
        </div>
      </div>
      {isProd ? <HashnodePageView publicationId={publication.id} /> : null}
    </>
  );
}
