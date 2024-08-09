import { renderRichText, storyblokEditable } from '@storyblok/react';
import parse from 'html-react-parser';
import React from 'react';

const HeadlineTextBlock = ({ blok }) => {
  const renderText = (text) => {
    if (typeof text === 'object' && text !== null) {
      // Render the rich text as HTML string
      return renderRichText(text);
    }
    return text;
  };

  return (
    <>
      <h2
        className="header-text-block__eyebrow mb-3 text-lg font-bold uppercase text-gray-600 sm:text-xl"
        {...storyblokEditable(blok)}
      >
        {blok.eyebrow}
      </h2>
      <div className="header-text-block__headline text-balance text-pretty text-4xl font-extrabold sm:text-5xl">
        {parse(renderText(blok.headline))}
      </div>
      <div className="header-text-block__introduction max-w-prose">
        {parse(renderText(blok.introduction))}
      </div>
    </>
  );
};

export default HeadlineTextBlock;
