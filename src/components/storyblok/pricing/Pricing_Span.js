import { storyblokEditable } from '@storyblok/react';

const Pricing_Span = ({ blok }) => {
  return (
    <span className="text-cornflower-blue-600" {...storyblokEditable(blok)}>
      {blok.value}
    </span>
  );
};
export default Pricing_Span;
