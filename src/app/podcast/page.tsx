import { Metadata } from 'next';

import ListenAnywhere from '@/components/podcast/ListenAnywhere';
import PodcastEpisodeList from '@/components/podcast/PodcastEpisodeList';
import { siteConfig } from '@/constants/config';
import { getUser } from '@/lib/hashnode';
import { getEpisodes, getShow } from '@/lib/transistor';
import { openGraph } from '@/utils/og';

import { metadata as rootMetadata } from '../metadata';

const url = `${siteConfig.url}/podcast`;

export async function generateMetadata(): Promise<Metadata> {
  const show = await getShow();

  const title = `${show.attributes.title || `${siteConfig.title} Podcast`} | ${siteConfig.title}`;
  const description = show.attributes.description;
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
      images: [ogImage],
    },
    twitter: {
      ...rootMetadata.twitter,
      title: `${title} | ${siteConfig.title}`,
      images: [ogImage],
    },
  };
}

export default async function PodcastPage() {
  const showData = getShow();
  const episodesData = getEpisodes({});
  const hostData = getUser('scapecast');

  const [show, episodes, host] = await Promise.all([
    showData,
    episodesData,
    hostData,
  ]);

  return (
    <div className="px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div itemScope itemType="http://schema.org/PodcastSeries" itemID={url}>
          <h1
            className="text-pretty text-4xl font-extrabold sm:text-5xl"
            itemProp="name"
          >
            {show.attributes.title || `${siteConfig.title} Blog`}
          </h1>
          <p
            className="mt-6 text-pretty text-lg font-semibold text-gray-900 sm:text-xl"
            itemProp="description"
          >
            {show.attributes.description}
          </p>
          <ListenAnywhere
            amazonMusicUrl={show.attributes.amazon_music}
            applePodcastsUrl={show.attributes.apple_podcasts}
            deezerUrl={show.attributes.amazon_music}
            playerFmUrl={show.attributes.player_FM}
            podcastAddictUrl={show.attributes.podcast_addict}
            spotifyUrl={show.attributes.spotify}
          />
        </div>
        <PodcastEpisodeList
          initialEpisodes={episodes.data}
          initialPageInfo={episodes.meta}
          getEpisodes={async (pageNumber: number) => {
            'use server';

            return await getEpisodes({
              pageNumber,
            });
          }}
          host={host ?? undefined}
        />
      </div>
    </div>
  );
}
