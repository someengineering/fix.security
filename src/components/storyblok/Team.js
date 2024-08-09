import { storyblokEditable } from '@storyblok/react';
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

import UnstyledLink from '@/components/common/links/UnstyledLink';
import StoryblokImage from '@/components/storyblok/StoryblokImage';
import { RichTextRenderer } from '@/utils/richTextRenderer';

const Team = ({ blok }) => (
  <div
    className="mx-auto grid max-w-3xl grid-cols-1 gap-x-16 gap-y-20 xl:max-w-7xl xl:grid-cols-6"
    {...storyblokEditable(blok)}
  >
    <div className="max-w-2xl space-y-6 text-lg font-medium leading-8 text-gray-900 sm:text-xl xl:col-span-2">
      <h2 className="text-5xl font-extrabold leading-none sm:text-6xl">
        {blok.caption}
      </h2>
      {blok.description.map((desc, index) => (
        <p key={index}>{desc.value}</p>
      ))}
    </div>
    <ul
      role="list"
      className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-4"
    >
      {blok.members.map((person) => (
        <li
          key={person.name}
          className="flex flex-col items-start gap-x-6 gap-y-10 pt-12 sm:flex-row"
        >
          <StoryblokImage
            blok={person}
            picture={person.picture}
            className="aspect-[4/5] w-52 flex-none rounded-full object-cover sm:aspect-[2/3]"
          />
          <div className="max-w-xl flex-auto">
            <h3 className="text-3xl font-extrabold text-cornflower-blue-600">
              {person.name}
            </h3>
            <p className="text-lg font-bold text-gray-900">{person.role}</p>
            <div className="mt-6 space-y-4 text-base leading-7 text-gray-600">
              {person.description.map((desc, index) => (
                <RichTextRenderer key={index} document={desc.value} />
              ))}
            </div>
            <ul role="list" className="mt-6 flex gap-x-4">
              <li>
                <UnstyledLink
                  href={person.linkedin}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin className="h-5 w-5" aria-hidden="true" />
                </UnstyledLink>
              </li>
              <li>
                <UnstyledLink
                  href={person.github}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="h-5 w-5" aria-hidden="true" />
                </UnstyledLink>
              </li>
            </ul>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Team;
