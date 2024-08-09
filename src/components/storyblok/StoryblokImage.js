import { storyblokEditable } from '@storyblok/react';

const extractDimensionsFromUrl = (url) => {
  const regex = /\/(\d+)x(\d+)\//;
  const match = url.match(regex);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }
  return { width: 100, height: 100 };
};

const StoryblokImage = ({ blok, picture, className }) => {
  const isSVG = picture.filename.endsWith('.svg');
  const { width, height } = extractDimensionsFromUrl(picture.filename);
  className =
    `${className || ''} ${blok.roundedCorners || ''} ${blok.shadow || ''}`.trim();

  if (isSVG) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={picture.filename + ''}
        alt={picture.alt || 'Image'}
        width={width}
        height={height}
        className={`${className}`}
      />
    );
  }

  return (
    <picture {...storyblokEditable(blok)}>
      <source
        srcSet={`${picture.filename}/m/0x0/filters:format(webp):quality(50)`}
        type="image/webp"
      />
      <source
        srcSet={`${picture.filename}/m/0x0/filters:format(png):quality(50)`}
        type="image/png"
      />
      <img
        src={picture.filename + '/m/filters:quality(50)'}
        alt={picture.alt}
        className={`${className}`}
      />
    </picture>
  );
};

export default StoryblokImage;
