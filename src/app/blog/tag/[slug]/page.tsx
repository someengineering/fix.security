import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getAllTagSlugs, getPostsByTag, getTagName } from '@/lib/hashnode';

import BlogPostList from '@/components/blog/BlogPostList';

import { metadata as rootMetadata } from '@/app/layout';
import { siteConfig } from '@/constants/config';
import { openGraph } from '@/utils/og';

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tag = await getTagName(params.slug);

  if (!tag) {
    return {};
  }

  const url = `${siteConfig.url}/blog/tag/${params.slug}`;
  const title = `${tag.charAt(0).toUpperCase()}${tag.slice(1)} | Blog`;
  const description = `Guides, how-tos, and news about ${tag} from the Fix team.`;
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

export default async function BlogTagPage({
  params,
}: {
  params: { slug: string };
}) {
  const tagName = await getTagName(params.slug);
  const data = await getPostsByTag({ tagSlug: params.slug });

  if (!tagName || !data) {
    redirect('/blog');
  }

  const title = `${tagName.charAt(0).toUpperCase()}${tagName.slice(1)}`;
  const description = `Guides, how-tos, and news about ${tagName} from the Fix team.`;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-2xl lg:max-w-4xl"
          itemScope
          itemType="http://schema.org/Blog"
          itemID={`${siteConfig.url}/blog`}
        >
          <meta itemProp="name" content={siteConfig.blogTitle} />
          <meta itemProp="description" content={siteConfig.blogDescription} />
          <p className="mb-2 text-xl font-semibold uppercase leading-8 text-primary-900">
            From the blog
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-xl leading-8 text-gray-600">{description}</p>
          <BlogPostList
            initialPosts={data.edges.map((edge) => edge.node)}
            initialPageInfo={data.pageInfo}
            tagSlug={params.slug}
          />
        </div>
      </div>
    </div>
  );
}
