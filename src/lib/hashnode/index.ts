import { encodeXML } from 'entities';
import { Feed } from 'feed';
import { GraphQLClient } from 'graphql-request';
import { flatten, sortBy, uniq } from 'lodash';
import 'server-only';

import { siteConfig } from '@/constants/config';
import { isLocal } from '@/constants/env';
import { HASHNODE_ENDPOINT, HASHNODE_HOST } from '@/constants/hashnode';
import {
  DraftDocument,
  DraftQuery,
  DraftQueryVariables,
  FeedPostsDocument,
  FeedPostsQuery,
  FeedPostsQueryVariables,
  PostDocument,
  PostFragment,
  PostQuery,
  PostQueryVariables,
  PostsBySeriesDocument,
  PostsBySeriesQuery,
  PostsBySeriesQueryVariables,
  PostsByTagDocument,
  PostsByTagQuery,
  PostsByTagQueryVariables,
  PostsDocument,
  PostSlugsDocument,
  PostSlugsQuery,
  PostSlugsQueryVariables,
  PostsQuery,
  PostsQueryVariables,
  PublicationDocument,
  PublicationIdDocument,
  PublicationIdQuery,
  PublicationIdQueryVariables,
  PublicationQuery,
  PublicationQueryVariables,
  RedirectedPostDocument,
  RedirectedPostQuery,
  RedirectedPostQueryVariables,
  SeriesDocument,
  SeriesFragment,
  SeriesListDocument,
  SeriesListQuery,
  SeriesListQueryVariables,
  SeriesQuery,
  SeriesQueryVariables,
  StaticPageDocument,
  StaticPageQuery,
  StaticPageQueryVariables,
  StaticPagesDocument,
  StaticPagesQuery,
  StaticPagesQueryVariables,
  SubscribeToNewsletterDocument,
  SubscribeToNewsletterMutation,
  SubscribeToNewsletterMutationVariables,
  TagDocument,
  TagFragment,
  TagQuery,
  TagQueryVariables,
  TagSlugsDocument,
  TagSlugsQuery,
  TagSlugsQueryVariables,
  UserDocument,
  UserQuery,
  UserQueryVariables,
} from '@/generated/hashnode/graphql';
import { getUserLink } from '@/utils/hashnode';

const gqlClient = new GraphQLClient(HASHNODE_ENDPOINT, {
  fetch,
  next: { revalidate: isLocal ? 0 : 300, tags: ['hashnode'] },
});

export const getPublication = async () => {
  const data = await gqlClient.request<
    PublicationQuery,
    PublicationQueryVariables
  >(PublicationDocument, {
    host: HASHNODE_HOST,
  });

  return data.publication;
};

export const getPublicationId = async () => {
  const data = await gqlClient.request<
    PublicationIdQuery,
    PublicationIdQueryVariables
  >(PublicationIdDocument, {
    host: HASHNODE_HOST,
  });

  return data.publication?.id;
};

export const getUser = async (username: string) => {
  const data = await gqlClient.request<UserQuery, UserQueryVariables>(
    UserDocument,
    {
      username,
    },
  );

  return data.user;
};

export const getAllTagSlugs = async () => {
  const data = await gqlClient.request<TagSlugsQuery, TagSlugsQueryVariables>(
    TagSlugsDocument,
    {
      host: HASHNODE_HOST,
      first: 20,
    },
  );

  let slugs: string[] = [];

  if (data.publication) {
    slugs = flatten(
      data.publication.posts.edges
        .filter((edge) => !edge.node.preferences.isDelisted)
        .map((edge) => edge.node.tags ?? []),
    ).map((tag) => tag.slug);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<
        TagSlugsQuery,
        TagSlugsQueryVariables
      >(TagSlugsDocument, {
        host: HASHNODE_HOST,
        first: 20,
        after,
      });

      if (!data.publication) {
        return;
      }

      slugs = [
        ...slugs,
        ...flatten(
          data.publication.posts.edges
            .filter((edge) => !edge.node.preferences.isDelisted)
            .map((edge) => edge.node.tags ?? []),
        ).map((tag) => tag.slug),
      ];

      if (
        data.publication.posts.pageInfo.hasNextPage &&
        data.publication.posts.pageInfo.endCursor
      ) {
        await fetchMore(data.publication.posts.pageInfo.endCursor);
      }
    };

    if (
      data.publication.posts.pageInfo.hasNextPage &&
      data.publication.posts.pageInfo.endCursor
    ) {
      await fetchMore(data.publication.posts.pageInfo.endCursor);
    }
  }

  return uniq(slugs);
};

export const getAllSeries = async () => {
  const data = await gqlClient.request<
    SeriesListQuery,
    SeriesListQueryVariables
  >(SeriesListDocument, {
    host: HASHNODE_HOST,
    first: 20,
  });

  let series: SeriesFragment[] = [];

  if (data.publication?.seriesList) {
    series = data.publication.seriesList.edges
      .filter((edge) => edge.node.posts.totalDocuments)
      .map((edge) => edge.node);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<
        SeriesListQuery,
        SeriesListQueryVariables
      >(SeriesListDocument, {
        host: HASHNODE_HOST,
        first: 20,
        after,
      });

      if (!data.publication) {
        return;
      }

      series = [
        ...series,
        ...data.publication.seriesList.edges
          .filter((edge) => edge.node.posts.totalDocuments)
          .map((edge) => edge.node),
      ];

      if (
        data.publication.seriesList.pageInfo.hasNextPage &&
        data.publication.seriesList.pageInfo.endCursor
      ) {
        await fetchMore(data.publication.seriesList.pageInfo.endCursor);
      }
    };

    if (
      data.publication.seriesList.pageInfo.hasNextPage &&
      data.publication.seriesList.pageInfo.endCursor
    ) {
      await fetchMore(data.publication.seriesList.pageInfo.endCursor);
    }
  }

  return sortBy(series, 'name');
};

export const getAllSeriesSlugs = async () => {
  const series = await getAllSeries();

  return series.map((series) => series.slug);
};

export const getAllPostSlugs = async () => {
  const data = await gqlClient.request<PostSlugsQuery, PostSlugsQueryVariables>(
    PostSlugsDocument,
    {
      host: HASHNODE_HOST,
      first: 20,
    },
  );

  let slugs: string[] = [];

  if (data.publication) {
    slugs = data.publication.posts.edges
      .filter((edge) => !edge.node.preferences.isDelisted)
      .map((edge) => edge.node.slug);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<
        PostSlugsQuery,
        PostSlugsQueryVariables
      >(PostSlugsDocument, {
        host: HASHNODE_HOST,
        first: 20,
        after,
      });

      if (!data.publication) {
        return;
      }

      slugs = [
        ...slugs,
        ...data.publication.posts.edges
          .filter((edge) => !edge.node.preferences.isDelisted)
          .map((edge) => edge.node.slug),
      ];

      if (
        data.publication.posts.pageInfo.hasNextPage &&
        data.publication.posts.pageInfo.endCursor
      ) {
        await fetchMore(data.publication.posts.pageInfo.endCursor);
      }
    };

    if (
      data.publication.posts.pageInfo.hasNextPage &&
      data.publication.posts.pageInfo.endCursor
    ) {
      await fetchMore(data.publication.posts.pageInfo.endCursor);
    }
  }

  return slugs;
};

export const getPosts = async ({
  first,
  after,
}: {
  first?: number;
  after?: string;
}) => {
  const data = await gqlClient.request<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    {
      host: HASHNODE_HOST,
      first: first && first > 0 ? (first > 20 ? 20 : first) : 20,
      after,
    },
  );

  data.publication?.posts?.edges.forEach((edge) => {
    if (edge.node.tags) {
      Object.assign(edge.node.tags, sortAndFormatTags(edge.node.tags));
    }
  });

  return data.publication?.posts
    ? {
        ...data.publication?.posts,
        edges: data.publication?.posts?.edges.filter(
          (edge) => !edge.node.preferences.isDelisted,
        ),
      }
    : undefined;
};

export const getAllPosts = async () => {
  const data = await getPosts({ first: 20 });

  let posts: PostFragment[] = [];

  if (data?.edges) {
    posts = data.edges.map((edge) => edge.node);

    const fetchMore = async (after?: string) => {
      const data = await getPosts({ first: 20, after });

      if (!data?.edges) {
        return;
      }

      posts = [...posts, ...data.edges.map((edge) => edge.node)];

      if (data.pageInfo?.hasNextPage && data.pageInfo.endCursor) {
        await fetchMore(data.pageInfo.endCursor);
      }
    };

    if (data.pageInfo?.hasNextPage && data.pageInfo.endCursor) {
      await fetchMore(data.pageInfo.endCursor);
    }
  }

  return posts;
};

export const getPostsByTag = async ({
  tagSlug,
  first,
  after,
}: {
  tagSlug: string;
  first?: number;
  after?: string;
}) => {
  const data = await gqlClient.request<
    PostsByTagQuery,
    PostsByTagQueryVariables
  >(PostsByTagDocument, {
    host: HASHNODE_HOST,
    tagSlug,
    first: first && first > 0 ? (first > 20 ? 20 : first) : 20,
    after,
  });

  data.publication?.posts?.edges.forEach((edge) => {
    if (edge.node.tags) {
      Object.assign(edge.node.tags, sortAndFormatTags(edge.node.tags));
    }
  });

  return data.publication?.posts
    ? {
        ...data.publication?.posts,
        edges: data.publication?.posts?.edges.filter(
          (edge) => !edge.node.preferences.isDelisted,
        ),
      }
    : undefined;
};

export const getPostsBySeries = async ({
  seriesSlug,
  first,
  after,
}: {
  seriesSlug: string;
  first?: number;
  after?: string;
}) => {
  const data = await gqlClient.request<
    PostsBySeriesQuery,
    PostsBySeriesQueryVariables
  >(PostsBySeriesDocument, {
    host: HASHNODE_HOST,
    seriesSlug,
    first: first && first > 0 ? (first > 20 ? 20 : first) : 20,
    after,
  });

  data.publication?.series?.posts?.edges.forEach((edge) => {
    if (edge.node.tags) {
      Object.assign(edge.node.tags, sortAndFormatTags(edge.node.tags));
    }
  });

  return data.publication?.series?.posts
    ? {
        ...data.publication?.series?.posts,
        edges: data.publication?.series?.posts.edges.filter(
          (edge) => !edge.node.preferences.isDelisted,
        ),
      }
    : undefined;
};

export const getFeed = async (): Promise<Feed> => {
  const data = await gqlClient.request<FeedPostsQuery, FeedPostsQueryVariables>(
    FeedPostsDocument,
    {
      host: HASHNODE_HOST,
    },
  );

  const feed = new Feed({
    title: data.publication?.title || `${siteConfig.title} Blog`,
    description: data.publication?.about?.text,
    id: `${siteConfig.url}/blog`,
    link: `${siteConfig.url}/blog`,
    language: 'en',
    image: `${siteConfig.url}/android-chrome-192x192.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: siteConfig.copyright,
    feedLinks: {
      rss2: `${siteConfig.url}/blog/rss.xml`,
      atom: `${siteConfig.url}/blog/atom.xml`,
      json: `${siteConfig.url}/blog/feed.json`,
    },
  });

  data.publication?.posts.edges
    .filter((edge) => !edge.node.preferences.isDelisted)
    .map((edge) => edge.node)
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `${siteConfig.url}/blog/${post.slug}`,
        link: `${siteConfig.url}/blog/${post.slug}`,
        date: new Date(post.updatedAt ? post.updatedAt : post.publishedAt),
        description: post.subtitle ?? post.brief,
        content: post.content?.html,
        image: post.coverImage ? encodeXML(post.coverImage.url) : undefined,
        author: post.author
          ? [
              {
                name: post.author.name,
                link: getUserLink(post.author),
              },
            ]
          : undefined,
      });
    });

  return feed;
};

export const getPost = async (postSlug: string) => {
  const data = await gqlClient.request<PostQuery, PostQueryVariables>(
    PostDocument,
    {
      host: HASHNODE_HOST,
      postSlug,
    },
  );

  if (data.publication?.post?.tags) {
    Object.assign(
      data.publication.post.tags,
      sortAndFormatTags(data.publication.post.tags),
    );
  }

  return data.publication?.post;
};

export const getRedirectedPost = async (postSlug: string) => {
  const data = await gqlClient.request<
    RedirectedPostQuery,
    RedirectedPostQueryVariables
  >(RedirectedPostDocument, {
    host: HASHNODE_HOST,
    postSlug,
  });

  return data.publication?.redirectedPost;
};

const tagNameMapping: Record<string, string> = {
  cli: 'CLI',
  cnapp: 'CNAPP',
  cspm: 'CSPM',
};

const formatTagName = (tag: string) => {
  if (tag in tagNameMapping) {
    return tagNameMapping[tag];
  }

  return tag;
};

const sortAndFormatTags = (tags: TagFragment[]): TagFragment[] => {
  return tags
    .map((tag) => ({ ...tag, name: formatTagName(tag.name) }))
    .sort((a, b) =>
      a.name.localeCompare(b.name, 'en-US', { sensitivity: 'base' }),
    );
};

export const getTagName = async (tagSlug: string) => {
  const data = await gqlClient.request<TagQuery, TagQueryVariables>(
    TagDocument,
    {
      tagSlug,
    },
  );

  return formatTagName(data.tag?.name ?? tagSlug);
};

export const getSeries = async (seriesSlug: string) => {
  const data = await gqlClient.request<SeriesQuery, SeriesQueryVariables>(
    SeriesDocument,
    {
      host: HASHNODE_HOST,
      seriesSlug,
    },
  );

  return data.publication?.series;
};

export const getDraft = async (id: string) => {
  const gqlClient = new GraphQLClient(HASHNODE_ENDPOINT, {
    next: { revalidate: 0 },
  });

  const data = await gqlClient.request<DraftQuery, DraftQueryVariables>(
    DraftDocument,
    {
      id,
    },
  );

  if (data.draft?.tagsV2) {
    Object.assign(
      data.draft.tagsV2,
      sortAndFormatTags(data.draft.tagsV2 as TagFragment[]),
    );
  }

  return data.draft;
};

export const getAllStaticPageSlugs = async () => {
  const data = await gqlClient.request<
    StaticPagesQuery,
    StaticPagesQueryVariables
  >(StaticPagesDocument, {
    host: HASHNODE_HOST,
    first: 20,
  });

  let slugs: string[] = [];

  if (data.publication) {
    slugs = data.publication.staticPages.edges
      .filter((edge) => !edge.node.hidden && edge.node.slug !== 'about')
      .map((edge) => edge.node.slug);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<
        StaticPagesQuery,
        StaticPagesQueryVariables
      >(StaticPagesDocument, {
        host: HASHNODE_HOST,
        first: 20,
        after,
      });

      if (!data.publication) {
        return;
      }

      slugs = [
        ...slugs,
        ...data.publication.staticPages.edges
          .filter((edge) => !edge.node.hidden && edge.node.slug !== 'about')
          .map((edge) => edge.node.slug),
      ];

      if (
        data.publication.staticPages.pageInfo.hasNextPage &&
        data.publication.staticPages.pageInfo.endCursor
      ) {
        await fetchMore(data.publication.staticPages.pageInfo.endCursor);
      }
    };

    if (
      data.publication.staticPages.pageInfo.hasNextPage &&
      data.publication.staticPages.pageInfo.endCursor
    ) {
      await fetchMore(data.publication.staticPages.pageInfo.endCursor);
    }
  }

  return slugs;
};

export const getAllComparePages = async () => {
  const data = await gqlClient.request<
    StaticPagesQuery,
    StaticPagesQueryVariables
  >(StaticPagesDocument, {
    host: HASHNODE_HOST,
    first: 20,
  });

  let pages: { title: string; slug: string }[] = [];

  if (data.publication) {
    pages = data.publication.staticPages.edges
      .filter(
        (edge) => !edge.node.hidden && edge.node.slug.startsWith('fix-vs-'),
      )
      .map((edge) => edge.node);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<
        StaticPagesQuery,
        StaticPagesQueryVariables
      >(StaticPagesDocument, {
        host: HASHNODE_HOST,
        first: 20,
        after,
      });

      if (!data.publication) {
        return;
      }

      pages = [
        ...pages,
        ...data.publication.staticPages.edges
          .filter(
            (edge) => !edge.node.hidden && edge.node.slug.startsWith('fix-vs-'),
          )
          .map((edge) => edge.node),
      ];

      if (
        data.publication.staticPages.pageInfo.hasNextPage &&
        data.publication.staticPages.pageInfo.endCursor
      ) {
        await fetchMore(data.publication.staticPages.pageInfo.endCursor);
      }
    };

    if (
      data.publication.staticPages.pageInfo.hasNextPage &&
      data.publication.staticPages.pageInfo.endCursor
    ) {
      await fetchMore(data.publication.staticPages.pageInfo.endCursor);
    }
  }

  return pages;
};

export const getStaticPage = async (pageSlug: string) => {
  const data = await gqlClient.request<
    StaticPageQuery,
    StaticPageQueryVariables
  >(StaticPageDocument, {
    host: HASHNODE_HOST,
    pageSlug,
  });

  return data.publication?.staticPage;
};

export const subscribeToNewsletter = async (email: string) => {
  const publicationId = await getPublicationId();

  if (!publicationId) {
    throw new Error('Failed to retrieve publication ID');
  }

  await gqlClient.request<
    SubscribeToNewsletterMutation,
    SubscribeToNewsletterMutationVariables
  >(SubscribeToNewsletterDocument, {
    input: { publicationId, email },
  });
};
