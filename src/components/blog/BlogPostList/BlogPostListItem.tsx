'use client';

import { LuBookOpen } from 'react-icons/lu';

import UnstyledLink from '@/components/common/links/UnstyledLink';
import NextImage from '@/components/common/NextImage';

import { siteConfig } from '@/constants/config';
import { PostFragment as HashnodePost } from '@/generated/hashnode/graphql';
import { getUserLink, getUserTitle } from '@/utils/hashnode';
import { openGraph } from '@/utils/og';

export default function BlogPostListItem({ post }: { post: HashnodePost }) {
  if (!post) {
    return null;
  }

  const authorLink = getUserLink(post.author);
  const authorDescription = getUserTitle(post.author);

  return (
    <article
      className="relative isolate flex flex-col items-center gap-8 lg:flex-row"
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
      itemID={`${siteConfig.url}/blog/${post.slug}`}
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
        {post.coverImage ? (
          <NextImage
            src={post.coverImage.url}
            alt=""
            className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-gray-50"
            classNames={{ image: 'object-cover' }}
            fill
          />
        ) : (
          <div className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover" />
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <header className="flex items-center space-x-5 text-sm font-semibold leading-7 text-gray-500">
          <time
            dateTime={post.publishedAt}
            className="font-bold text-marian-blue-800"
            itemProp="datePublished"
          >
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="flex items-center space-x-1.5">
            <LuBookOpen className="h-4 w-4" aria-hidden="true" />
            <span>{post.readTimeInMinutes} min read</span>
          </span>
          <link
            itemProp="image"
            href={openGraph({
              title: post.title,
              description: post.subtitle ?? undefined,
            })}
          />
          {post.updatedAt ? (
            <meta itemProp="dateModified" content={post.updatedAt} />
          ) : null}
        </header>
        <div className="group relative max-w-xl space-y-4">
          <h3
            className="mt-2 text-2xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
            itemProp="headline"
          >
            <UnstyledLink href={`/blog/${post.slug}`} itemProp="url">
              <span className="absolute inset-0" />
              {post.title}
            </UnstyledLink>
          </h3>
          <p
            className="text-base leading-6 text-gray-600"
            itemProp="description"
          >
            {post.subtitle ?? post.brief}
          </p>
          <div
            className="relative flex items-center gap-x-3"
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
          >
            {post.author.profilePicture ? (
              <NextImage
                src={post.author.profilePicture}
                alt=""
                className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-50"
                classNames={{ image: 'w-full h-full object-cover' }}
                width={40}
                height={40}
                itemProp="image"
              />
            ) : (
              <div className="h-10 w-10 shrink-0 rounded-full bg-gray-50" />
            )}
            <div className="text-sm">
              <p className="font-semibold text-gray-900" itemProp="name">
                {authorLink ? (
                  <UnstyledLink href={authorLink} itemProp="url">
                    {post.author.name}
                  </UnstyledLink>
                ) : (
                  <>{post.author.name}</>
                )}
              </p>
              {authorDescription ? (
                <p
                  className="line-clamp-1 text-gray-600"
                  itemProp="description"
                >
                  {authorDescription}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <footer className="mt-4 flex gap-x-1.5 border-t border-gray-900/5 pt-4 text-sm font-medium text-marian-blue-900">
          {post.tags?.map((tag) => (
            <UnstyledLink
              href={`/blog/tag/${tag.slug}`}
              className="relative z-10 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 hover:border-marian-blue-100 hover:bg-marian-blue-50"
              key={`tag-${tag.slug}`}
            >
              {tag.name}
            </UnstyledLink>
          ))}
        </footer>
      </div>
    </article>
  );
}
