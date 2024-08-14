import { storyblokEditable } from '@storyblok/react';

import { RichTextRenderer } from '@/utils/richTextRenderer';

const RichText = ({ blok }) => {
  return (
    <RichTextRenderer document={blok.value} {...storyblokEditable(blok)} />
  );
};

export default RichText;
