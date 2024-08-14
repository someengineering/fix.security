import { StoryblokComponent, storyblokEditable } from '@storyblok/react';

import ButtonLink from '@/components/common/links/ButtonLink';
import StoryblokImage from '@/components/storyblok/StoryblokImage';
import { siteConfig } from '@/constants/config';

const Hero = ({ blok }) => {
  if (!blok) {
    return <div>No content available</div>;
  }

  return (
    <>
      <div className="mx-auto pb-12 lg:p-0" {...storyblokEditable(blok)}>
        {blok.leftColumn &&
          blok.leftColumn.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        <div className="mt-6 space-x-5">
          <ButtonLink href={siteConfig.registerUrl} size="lg">
            Start for free
          </ButtonLink>
        </div>
      </div>

      {blok.picture && (
        <StoryblokImage
          blok={blok}
          picture={blok.picture}
          className="mx-auto hidden w-full max-w-3xl flex-shrink-0 sm:flex lg:w-7/12"
        />
      )}
      {blok.pictureMobile && (
        <StoryblokImage
          blok={blok}
          picture={blok.pictureMobile}
          className="w-full sm:hidden"
        />
      )}
    </>
  );
};

export default Hero;
