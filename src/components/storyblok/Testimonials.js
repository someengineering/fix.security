import { storyblokEditable } from '@storyblok/react';
import React from 'react';

import StoryblokImage from '@/components/storyblok/StoryblokImage';

const Testimonials = ({ blok }) => (
  <div
    className="mx-auto -mt-10 grid max-w-2xl grid-cols-1 gap-y-10 divide-y divide-gray-900/10 sm:-mt-16 sm:gap-y-16 lg:mx-0 lg:-ml-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:divide-x lg:divide-y-0"
    {...storyblokEditable(blok)}
  >
    {blok.div.map((testimonial, index) => (
      <div
        className="flex flex-col space-y-8 pt-10 sm:pt-16 lg:pl-8 lg:pt-0"
        key={`testimonial-${index}`}
      >
        <span className="sr-only">{testimonial.company_name}</span>
        <StoryblokImage
          blok={testimonial}
          picture={testimonial.picture}
          className="h-8 w-auto max-w-[6rem] self-start"
        />
        <figure className="flex flex-auto flex-col justify-between space-y-8">
          <blockquote className="text-lg font-medium leading-8 text-gray-900">
            <p>&ldquo;{testimonial.testimonial}&rdquo;</p>
          </blockquote>
          <figcaption className="flex items-center gap-x-4">
            <picture {...storyblokEditable(blok)}>
              <source
                srcSet={`${testimonial.author_picture.filename}/m/0x0/filters:format(webp)`}
                type="image/webp"
              />
              <source
                srcSet={`${testimonial.author_picture.filename}/m/0x0/filters:format(png)`}
                type="image/png"
              />
              <img
                src={testimonial.author_picture.filename}
                alt={testimonial.author_name}
                className="h-12 w-12 rounded-full bg-gray-50"
              />
            </picture>
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {testimonial.author_name}
              </div>
              <div className="line-clamp-1 text-base text-gray-600">
                {testimonial.author_role} at {testimonial.company_name}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    ))}
    {blok.name}
  </div>
);

export default Testimonials;
