import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import HashnodePageView from '@/components/analytics/HashnodePageView';
import BlogPostList from '@/components/blog/BlogPostList';
import { siteConfig } from '@/constants/config';
import { isProd } from '@/constants/env';
import {
  getAllSeriesSlugs,
  getPostsBySeries,
  getPublication,
  getSeries,
} from '@/lib/hashnode';
import { openGraph } from '@/utils/og';

import { metadata as rootMetadata } from '../../../metadata';

export async function generateStaticParams() {
  const slugs = await getAllSeriesSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const series = await getSeries(params.slug);

  if (!series || !series.posts.totalDocuments) {
    return {};
  }

  const url = `${siteConfig.url}/blog/series/${params.slug}`;
  const title = `${series.name} | Blog`;
  const description = series.description?.text;
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
      description,
      images: [ogImage],
    },
    twitter: {
      ...rootMetadata.twitter,
      title: `${title} | ${siteConfig.title}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogSeriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const publicationData = getPublication();
  const seriesInfoData = getSeries(params.slug);
  const postsData = getPostsBySeries({ seriesSlug: params.slug });

  const [publication, seriesInfo, posts] = await Promise.all([
    publicationData,
    seriesInfoData,
    postsData,
  ]);

  if (
    !publication ||
    !seriesInfo ||
    !seriesInfo.posts.totalDocuments ||
    !posts
  ) {
    notFound();
  }

  return (
    <>
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mx-auto max-w-2xl lg:max-w-4xl"
            itemScope
            itemType="http://schema.org/Blog"
            itemID={`${siteConfig.url}/blog`}
          >
            <meta itemProp="name" content={publication.title} />
            <meta itemProp="description" content={publication.about?.text} />
            <p className="mb-2 text-lg font-bold uppercase leading-8 text-cornflower-blue-600 sm:text-xl">
              Blog series
            </p>
            <h1 className="text-pretty text-4xl font-extrabold sm:text-5xl">
              {seriesInfo.name}
            </h1>
            {seriesInfo.description ? (
              <p className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl">
                {seriesInfo.description.text}
              </p>
            ) : null}
            <BlogPostList
              initialPosts={posts.edges.map((edge) => edge.node)}
              initialPageInfo={posts.pageInfo}
              getPosts={async (after: string) => {
                'use server';

                return await getPostsBySeries({
                  seriesSlug: params.slug,
                  after,
                });
              }}
              showSeries={false}
            />
          </div>
        </div>
      </div>
      {isProd ? (
        <HashnodePageView
          publicationId={publication.id}
          seriesId={seriesInfo.id}
        />
      ) : null}
    </>
  );
}
