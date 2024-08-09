import { StoryblokComponent } from '@storyblok/react';

const StoryblokRenderer = ({ story }) => (
  <>
    {story.content.body.map((blok) => (
      <StoryblokComponent blok={blok} key={blok._uid} />
    ))}
  </>
);

export default StoryblokRenderer;
