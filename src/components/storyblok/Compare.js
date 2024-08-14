import { storyblokEditable } from '@storyblok/react';
import React from 'react';

import ButtonLink from '@/components/common/links/ButtonLink';
import StoryblokImage from '@/components/storyblok/StoryblokImage';
import { RichTextRenderer } from '@/utils/richTextRenderer';

const Compare = ({ blok }) => (
  <div className="compare">
    <div
      className="compare__pictures mb-12 flex items-center space-x-10"
      aria-hidden="true"
      {...storyblokEditable(blok)}
    >
      <StoryblokImage
        blok={blok}
        picture={blok.picture_1}
        className="h-24 w-24 text-cornflower-blue-600"
      />
      <span className="h-10 w-10 rounded-full bg-marian-blue-50 text-center text-lg font-extrabold leading-10">
        VS
      </span>
      <StoryblokImage
        blok={blok}
        picture={blok.picture_2}
        className="h-24 w-24"
      />
    </div>
    <h2 className="text-pretty text-4xl font-extrabold sm:text-5xl">
      {blok.caption}
    </h2>
    {blok.description.map((desc, index) => (
      <div key={index} className="compare__introduction">
        <RichTextRenderer document={desc.value} />
      </div>
    ))}
    <div className="mt-12 space-x-5">
      <ButtonLink href={blok.button_href} size="lg">
        Try Fix Security for free
      </ButtonLink>
    </div>
  </div>
);

export default Compare;
