import { storyblokEditable } from '@storyblok/react';
import { LuArmchair } from 'react-icons/lu';

const Pricing_Additional_Seats = ({ blok }) => {
  return (
    <div
      className="flex flex-col rounded-2xl p-8 ring-1 ring-gray-200"
      {...storyblokEditable(blok)}
    >
      <h3 className="flex items-center gap-3 text-3xl font-bold leading-7 text-cornflower-blue-600">
        <LuArmchair />
        {blok.caption}
      </h3>
      <p className="my-8 flex items-baseline gap-x-1">
        <span className="text-3xl font-bold tracking-tight text-gray-900">
          {blok.price}
        </span>
        <span className="ml-1 text-sm font-semibold leading-6 text-gray-600">
          {blok.price_description}
        </span>
      </p>
      <p className="text-base text-gray-600">{blok.price_definition}</p>
    </div>
  );
};

export default Pricing_Additional_Seats;
