import { renderRichText, storyblokEditable } from '@storyblok/react';
import parse from 'html-react-parser';
import React from 'react';

const HeadlineTextBlockMinimal = ({ blok }) => {
  const renderText = (text) => {
    if (typeof text === 'object' && text !== null) {
      // Render the rich text as HTML string
      return renderRichText(text);
    }
    return text;
  };

  return (
    <>
      <h1
        className="header-text-block__headline text-balance text-pretty text-4xl font-extrabold sm:text-5xl"
        {...storyblokEditable(blok)}
      >
        {blok.headline}
      </h1>
      <div className="header-text-block__introduction max-w-prose">
        {parse(renderText(blok.introduction))}
      </div>
    </>
  );
};

export default HeadlineTextBlockMinimal;
