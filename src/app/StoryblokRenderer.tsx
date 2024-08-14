'use client';

import {
  ISbStoryData,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react';
import React from 'react';

interface Blok {
  _uid: string;
  component: string;
  [key: string]: unknown;
}

// Define the content type used in ISbStoryData
interface StoryContent {
  body: Blok[];
}

interface StoryblokRendererProps {
  story: ISbStoryData<StoryContent>;
}

const StoryblokRenderer: React.FC<StoryblokRendererProps> = ({ story }) => {
  // Enable live updates in the Storyblok Visual Editor
  const liveStory = useStoryblokState(story);

  return (
    <div>
      {liveStory?.content?.body.map((blok) => (
        <StoryblokComponent blok={blok} key={blok._uid} />
      ))}
    </div>
  );
};

export default StoryblokRenderer;
