import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';

const Picture = ({ blok }) => {
  const srcUrl = `${blok.value.filename}${blok.appearance ? blok.appearance : ''}`;
  const className = `${blok.value.className ? blok.value.className : ''}`;
  return (
    <Image
      className={className}
      src={srcUrl}
      alt={blok.value.alt}
      width="100"
      height="100"
      {...storyblokEditable(blok)}
    ></Image>
  );
};

export default Picture;
