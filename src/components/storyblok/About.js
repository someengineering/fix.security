import { storyblokEditable } from '@storyblok/react';

import { RichTextRenderer } from '@/utils/richTextRenderer';

const About = ({ blok }) => (
  <div className="px-6 py-16 sm:py-24 lg:px-8" {...storyblokEditable(blok)}>
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-3 text-lg font-bold uppercase text-gray-600 sm:text-xl">
        {blok.caption}
      </h1>
      <p className="text-pretty text-4xl font-extrabold sm:text-5xl">
        {blok.header_text}
        <span className="text-cornflower-blue-600">{blok.header_span}</span>
      </p>
      <div className="markdown static-page">
        {blok.content.map((item, index) => (
          <RichTextRenderer key={index} document={item.value} />
        ))}
      </div>
    </div>
  </div>
);

export default About;
