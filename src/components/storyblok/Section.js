import { StoryblokComponent, storyblokEditable } from '@storyblok/react';

import { sanitizeClassName } from '@/utils/sanitizeClass';

const Section = ({ blok }) => {
  return (
    <section
      className={`${blok.padding ? blok.padding : 'py-16 sm:py-24'} ${blok.bgColor ? blok.bgColor : ''} ${blok.name ? sanitizeClassName(blok.name) : ''}`}
      {...storyblokEditable(blok)}
    >
      <div className={blok.inner}>
        {blok.data.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
};

export default Section;
