import { request } from 'graphql-request';
import { type NextRequest, NextResponse } from 'next/server';

import { HASHNODE_ENDPOINT, HASHNODE_HOST } from '@/constants/hashnode';
import { HashnodePostResponse } from '@/interfaces/hashnode';

export const revalidate = 3600; // revalidate at most every hour

export async function GET(req: NextRequest) {
  const variables = {
    host: HASHNODE_HOST,
    slug: req.nextUrl.searchParams.get('slug'),
  };

  const query = `
    query Publication($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title
          subtitle
          brief
          slug
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

  return NextResponse.json(data.publication.post, { status: 200 });
}
