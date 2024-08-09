import { StoryblokComponent, storyblokEditable } from '@storyblok/react';

const Div = ({ blok }) => {
  return (
    <div className={blok.className} {...storyblokEditable(blok)}>
      {blok.value.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Div;
