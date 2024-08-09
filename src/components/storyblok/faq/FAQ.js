'use client';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { storyblokEditable } from '@storyblok/react';
import { LuMinus, LuPlus } from 'react-icons/lu';

import { RichTextRenderer } from '@/utils/richTextRenderer';

const FAQ = ({ blok }) => {
  return (
    <section
      className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8"
      id="faq"
      {...storyblokEditable(blok)}
    >
      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 className="text-4xl font-extrabold sm:text-5xl">{blok.caption}</h2>
        <dl className="mt-20 space-y-6 divide-y divide-gray-900/10">
          {blok.faq_items.map((faq, index) => (
            <Disclosure as="div" key={`faq-${index}`} className="pt-6">
              {({ open }) => (
                <>
                  <DisclosureButton
                    as="dt"
                    className="flex w-full cursor-pointer items-start justify-between text-left text-lg font-semibold text-gray-900 hover:text-gray-950"
                  >
                    <span className="grow">{faq.question}</span>
                    <span className="ml-7 flex h-7 items-center">
                      {open ? (
                        <LuMinus className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <LuPlus className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel
                    as="dd"
                    className="mt-6 space-y-2 pr-12 text-base font-medium leading-7 text-gray-700"
                    unmount={false}
                  >
                    <RichTextRenderer document={faq.answer} />
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FAQ;
