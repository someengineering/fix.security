import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import BlogPost from '@/components/blog/BlogPost';

import {
  getHashnodePost,
  getHashnodePostSlugs,
  getHashnodePublicationId,
} from '@/api/hashnode';
import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

export async function generateStaticParams() {
  const slugs = await getHashnodePostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

async function getPost(slug: string) {
  return await getHashnodePost(slug);
}

async function getPublicationId() {
  return await getHashnodePublicationId();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {};
  }

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const title = post.title;
  const description = post.subtitle ?? post.brief;

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
      images: [
        openGraph({
          title,
          description: post.subtitle,
        }),
      ],
      type: 'article',
      tags: post.tags?.map((tag) => tag.name),
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      ...rootMetadata.twitter,
      title: `${post.title} | ${siteConfig.title}`,
      description,
      images: [
        openGraph({
          title,
          description: post.subtitle,
        }),
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  const publicationId = await getPublicationId();

  if (!post) {
    redirect('/blog');
  }

  return <BlogPost post={post} publicationId={publicationId} />;
}
