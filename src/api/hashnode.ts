import { gql, request } from 'graphql-request';

import { HASHNODE_ENDPOINT, HASHNODE_HOST } from '@/constants/hashnode';
import {
  HashnodePostResponse,
  HashnodePostsResponse,
} from '@/interfaces/hashnode';

export async function getHashnodePostSlugs() {
  const variables = {
    host: HASHNODE_HOST,
    first: 20,
  };

  const query = gql`
    query Publication($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              slug
            }
          }
        }
      }
    }
  `;

  const data = await request<HashnodePostsResponse>(
    HASHNODE_ENDPOINT,
    query,
    variables,
  );

  return data.publication.posts.edges.map((edge) => edge.node.slug);
}

export async function getHashnodePosts({
  first,
  after,
}: {
  first?: number;
  after?: string;
}) {
  const variables = {
    host: HASHNODE_HOST,
    first: first && first > 0 ? (first > 20 ? 20 : first) : 5,
    after,
  };

  const query = gql`
    query Publication($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after) {
          edges {
            node {
              title
              subtitle
              brief
              slug
              tags {
                name
                slug
              }
              coverImage {
                url
              }
              author {
                name
                tagline
                profilePicture
                socialMediaLinks {
                  website
                  linkedin
                }
              }
              readTimeInMinutes
              publishedAt
            }
            cursor
          }
        }
      }
    }
  `;

  const data = await request<HashnodePostsResponse>(
    HASHNODE_ENDPOINT,
    query,
    variables,
  );

  return data.publication.posts.edges;
}

export async function getHashnodePost({ slug }: { slug: string }) {
  const variables = {
    host: HASHNODE_HOST,
    slug,
  };

  const query = `
    query Publication($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title
          subtitle
          brief
          slug
          tags {
            name
            slug
          }
          coverImage {
            url
          }
          author {
            name
            tagline
            profilePicture
            socialMediaLinks {
              website
              linkedin
            }
          }
          content {
            markdown
          }
          readTimeInMinutes
          publishedAt
        }
      }
    }
  `;

  const data = await request<HashnodePostResponse>(
    HASHNODE_ENDPOINT,
    query,
    variables,
  );

  return data.publication.post;
}