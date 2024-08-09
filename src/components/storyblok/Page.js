import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';

const Page = ({ blok }) => (
  <>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent
        blok={nestedBlok}
        key={nestedBlok._uid}
        {...storyblokEditable(blok)}
      />
    ))}
  </>
);

export default Page;
