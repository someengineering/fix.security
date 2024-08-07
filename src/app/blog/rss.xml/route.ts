import { getFeed } from '@/lib/hashnode';

export const revalidate = 300;

export async function GET() {
  const feed = await getFeed();

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'text/xml',
      'Content-Encoding': 'utf-8',
    },
  });
}
