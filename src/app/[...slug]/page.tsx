import { ISbStoriesParams } from '@storyblok/react';
import { getStoryblokApi, StoryblokComponent } from '@storyblok/react/rsc';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isProd } from '@/constants/env';
import { generateMetadataFromStory } from '@/lib/storyblok';

async function fetchData(slug: string) {
  const sbParams: ISbStoriesParams = {
    version: isProd ? 'published' : 'draft',
  };
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error('Storyblok API is not initialized');
  }

  return await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const story = await fetchData(params.slug.join('/'));

  return generateMetadataFromStory(story, false);
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slugPath = params.slug.join('/');
  let data;
  try {
    const response = await fetchData(slugPath);
    data = response.data;
  } catch (error) {
    notFound();
  }
  return (
    <>
      <StoryblokComponent blok={data.story.content} />
    </>
  );
}
