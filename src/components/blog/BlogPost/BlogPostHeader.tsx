import { LuBookOpen } from 'react-icons/lu';

import SocialShareButtons from '@/components/blog/SocialShareButtons';
import UnstyledLink from '@/components/common/links/UnstyledLink';
import NextImage from '@/components/common/NextImage';

import {
  DraftTagFragment as HashnodeDraftTag,
  TagFragment as HashnodeTag,
  UserFragment as HashnodeUser,
} from '@/generated/hashnode/graphql';
import { getUserLink, getUserTitle } from '@/utils/hashnode';
import { openGraph } from '@/utils/og';

export default function BlogPostHeader({
  url,
  title,
  subtitle,
  brief,
  author,
  tags,
  publishedAt,
  updatedAt,
  readTimeInMinutes,
}: {
  url?: string;
  title: string;
  subtitle?: string;
  brief?: string;
  author: HashnodeUser;
  tags?: (HashnodeTag | HashnodeDraftTag)[];
  publishedAt: string;
  updatedAt?: string;
  readTimeInMinutes?: number;
}) {
  const authorLink = getUserLink(author);
  const authorDescription = getUserTitle(author);

  return (
    <header className="space-y-4">
      <div className="flex flex-row items-center justify-between gap-x-10">
        <span className="flex items-center space-x-6 text-base font-bold uppercase leading-7 text-gray-500 sm:text-lg">
          <time dateTime={publishedAt} itemProp="datePublished">
            {new Date(publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {readTimeInMinutes ? (
            <span className="flex items-center space-x-2">
              <LuBookOpen className="h-5 w-5" aria-hidden="true" />
              <span>{readTimeInMinutes} min read</span>
            </span>
          ) : null}
        </span>
        <link
          itemProp="image"
          href={openGraph({
            title: title,
            description: subtitle,
          })}
        />
        {updatedAt ? (
          <meta itemProp="dateModified" content={updatedAt} />
        ) : null}
        {url ? (
          <>
            <link itemProp="url" href={url} />
            <div className="flex shrink-0">
              <SocialShareButtons
                url={url}
                title={title}
                hashtags={[
                  'fix',
                  ...(tags ?? []).map((tag) => tag.slug.replaceAll('-', '')),
                ]}
              />
            </div>
          </>
        ) : null}
      </div>
      <h1
        className="text-pretty font-display text-4xl font-medium uppercase text-marian-blue-900 sm:text-5xl"
        itemProp="headline"
      >
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl">
          {subtitle}
        </p>
      ) : (
        <meta itemProp="description" content={brief} />
      )}
      <div
        className="relative flex items-center gap-x-4"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        {author.profilePicture ? (
          <NextImage
            src={author.profilePicture}
            alt=""
            className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-50"
            classNames={{ image: 'w-full h-full object-cover' }}
            width={40}
            height={40}
            itemProp="image"
          />
        ) : (
          <div className="h-12 w-12 shrink-0 rounded-full bg-gray-50" />
        )}
        <div>
          <p className="text-lg font-semibold text-gray-900" itemProp="name">
            {authorLink ? (
              <UnstyledLink href={authorLink} itemProp="url">
                {author.name}
              </UnstyledLink>
            ) : (
              <>{author.name}</>
            )}
          </p>
          {authorDescription ? (
            <p
              className="line-clamp-1 text-base text-gray-500"
              itemProp="description"
            >
              {authorDescription}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
