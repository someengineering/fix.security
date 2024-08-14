import { storyblokEditable } from '@storyblok/react';

import StoryblokImage from '@/components/storyblok/StoryblokImage';

const Customers = ({ blok }) => {
  if (!blok || !Array.isArray(blok.pictures)) {
    return <div>Error</div>;
  }

  const editableProps = storyblokEditable(blok);

  return (
    <>
      <h2
        className="text-balance text-center text-2xl font-bold leading-8 text-gray-900"
        {...editableProps}
        {...storyblokEditable(blok)}
      >
        {blok.caption}
      </h2>
      <div
        className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:mt-10 lg:justify-between lg:gap-x-0"
        {...editableProps}
        {...storyblokEditable(blok)}
      >
        {blok.pictures.map((customer, index) => (
          <div key={`customer-${index}`}>
            <span className="sr-only">{customer.alt}</span>
            <StoryblokImage
              blok={blok}
              picture={customer}
              className="h-8 w-auto max-w-[8rem] lg:h-10 lg:max-w-[10rem]"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Customers;
