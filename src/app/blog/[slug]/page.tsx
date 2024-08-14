import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { metadata as notFoundMetadata } from '@/app/not-found';
import BlogPost from '@/components/blog/BlogPost';
import { siteConfig } from '@/constants/config';
import {
  getAllPostSlugs,
  getPost,
  getPublication,
  getRedirectedPost,
} from '@/lib/hashnode';
import { openGraph } from '@/utils/og';

import { metadata as rootMetadata } from '../../metadata';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
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
  const ogImage = openGraph({
    title,
    description: post.subtitle ?? undefined,
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
      type: 'article',
      tags: post.tags?.map((tag) => tag.name),
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? undefined,
    },
    twitter: {
      ...rootMetadata.twitter,
      title: `${post.title} | ${siteConfig.title}`,
      description,
      images: [ogImage],
    },
    ...(post.preferences.isDelisted ? { robots: notFoundMetadata.robots } : {}),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const publicationData = getPublication();
  const postData = getPost(params.slug);

  const [publication, post] = await Promise.all([publicationData, postData]);

  if (!publication || !post) {
    const redirectedPost = await getRedirectedPost(params.slug);

    if (redirectedPost) {
      permanentRedirect(`/blog/${redirectedPost.slug}`);
    }

    notFound();
  }

  return <BlogPost post={post} publication={publication} />;
}
