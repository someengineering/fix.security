import { StoryblokComponent, storyblokEditable } from '@storyblok/react';

const Span = ({ blok }) => {
  return (
    <span className={blok.className} {...storyblokEditable(blok)}>
      {blok.data.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </span>
  );
};

export default Span;
