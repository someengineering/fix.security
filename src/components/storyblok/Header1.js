import { StoryblokComponent, storyblokEditable } from '@storyblok/react';

const Header1 = ({ blok }) => {
  return (
    <h1 className={blok.className} {...storyblokEditable(blok)}>
      {blok.data.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </h1>
  );
};

export default Header1;
