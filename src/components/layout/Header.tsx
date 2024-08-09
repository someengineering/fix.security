import { LuBookOpen, LuPodcast } from 'react-icons/lu';

import PrimaryLink from '@/components/common/links/PrimaryLink';
import UnstyledLink from '@/components/common/links/UnstyledLink';
import NavigationMenu, {
  NavigationItem,
} from '@/components/layout/NavigationMenu';
import { getAllComparePages, getAllSeries, getPosts } from '@/lib/hashnode';
import { getEpisodes } from '@/lib/transistor';
import { parseEpisodeTitle } from '@/utils/transistor';

export default async function Header() {
  const comparePagesData = getAllComparePages();
  const blogSeriesData = getAllSeries();
  const blogPostsData = getPosts({ first: 3 });
  const podcastEpisodesData = getEpisodes({ pageSize: 3 });

  const [comparePages, blogSeries, blogPosts, podcastEpisodes] =
    await Promise.all([
      comparePagesData,
      blogSeriesData,
      blogPostsData,
      podcastEpisodesData,
    ]);

  const navigationItems: NavigationItem[] = [
    {
      name: 'About',
      href: '/about',
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Docs', href: 'https://docs.fix.security' },
    {
      name: 'Compare',
      href: '#',
      children: comparePages.map((page) => ({
        name: `Fix Security vs. ${page.title}`,
        href: `/compare/${page.slug}`,
      })),
    },
    {
      name: 'Blog',
      href: '/blog',
      children: blogSeries.map((series) => ({
        name: series.name,
        href: `/blog/series/${series.slug}`,
        description: series.description?.text,
      })),
      popoverContent: blogPosts?.edges.length ? (
        <>
          <div className="flex justify-between text-sm leading-6">
            <h3 className="font-bold text-gray-500">Recent posts</h3>
            <PrimaryLink href="/blog">
              See all <span aria-hidden="true">&rarr;</span>
            </PrimaryLink>
          </div>
          <ul role="list" className="mt-6 space-y-6">
            {blogPosts.edges
              .map((edge) => edge.node)
              .map((post) => (
                <li key={post.id} className="relative">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs font-bold uppercase leading-6 text-gray-600">
                    {post.series ? (
                      <UnstyledLink
                        href={`/blog/series/${post.series.slug}`}
                        title="This post is part of a series"
                        className="whitespace-nowrap rounded-md bg-cornflower-blue-800 px-2 py-1 font-extrabold leading-none text-white hover:bg-cornflower-blue-900"
                      >
                        {post.series.name}
                      </UnstyledLink>
                    ) : null}
                    <time
                      dateTime={post.publishedAt}
                      className="whitespace-nowrap"
                    >
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="flex items-center space-x-1 whitespace-nowrap">
                      <LuBookOpen className="h-4 w-4" aria-hidden="true" />
                      <span>{post.readTimeInMinutes} min read</span>
                    </span>
                  </div>
                  <PrimaryLink
                    href={`/blog/${post.slug}`}
                    className="line-clamp-2 block font-extrabold leading-6"
                  >
                    {post.title}
                  </PrimaryLink>
                </li>
              ))}
          </ul>
        </>
      ) : undefined,
    },
    {
      name: 'Podcast',
      href: '/podcast',
      popoverContent: blogPosts?.edges.length ? (
        <>
          <div className="flex justify-between text-sm leading-6">
            <h3 className="font-bold text-gray-500">Recent episodes</h3>
            <PrimaryLink href="/podcast">
              See all <span aria-hidden="true">&rarr;</span>
            </PrimaryLink>
          </div>
          <ul role="list" className="mt-6 space-y-6">
            {podcastEpisodes.data &&
              podcastEpisodes.data.map((episode) => {
                const { title } = parseEpisodeTitle(episode.attributes.title);
                const durationHours = Math.floor(
                  episode.attributes.duration / 60 / 60,
                );
                const durationMinutes = Math.floor(
                  (episode.attributes.duration / 60) % 60,
                );

                return (
                  <li key={episode.id} className="relative">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs font-bold uppercase leading-6 text-gray-600">
                      <time
                        dateTime={episode.attributes.published_at}
                        className="whitespace-nowrap"
                      >
                        {new Date(
                          episode.attributes.published_at,
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="flex items-center space-x-1 whitespace-nowrap">
                        <LuPodcast className="h-4 w-4" aria-hidden="true" />
                        <span>{`${durationHours > 0 ? `${durationHours} hr ` : ''}${durationMinutes} min`}</span>
                      </span>
                    </div>
                    <PrimaryLink
                      href={`/podcast/${episode.attributes.slug}`}
                      className="line-clamp-2 block font-extrabold leading-6"
                    >
                      {title}
                    </PrimaryLink>
                  </li>
                );
              })}
          </ul>
        </>
      ) : undefined,
    },
  ];

  return (
    <header>
      <NavigationMenu items={navigationItems} />
    </header>
  );
}
