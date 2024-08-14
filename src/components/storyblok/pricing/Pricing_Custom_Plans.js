import { storyblokEditable } from '@storyblok/react';
import { LuPencilRuler } from 'react-icons/lu';

import UnstyledLink from '@/components/common/links/UnstyledLink';

const Pricing_Custom_Plans = ({ blok }) => {
  return (
    <div
      className="flex flex-col rounded-2xl p-8 ring-1 ring-gray-200"
      {...storyblokEditable(blok)}
    >
      <h3 className="flex items-center gap-3 text-3xl font-bold leading-7 text-cornflower-blue-600">
        <LuPencilRuler />
        {blok.caption}
      </h3>
      <p className="my-8 text-xl font-semibold leading-8 text-gray-600">
        <UnstyledLink href="mailto:hi@fix.security">
          {blok.mailer_caption} &rarr;
        </UnstyledLink>
      </p>
      <p className="text-base text-gray-600">{blok.description}</p>
    </div>
  );
};

export default Pricing_Custom_Plans;
