import { storyblokEditable } from '@storyblok/react';
import React from 'react';
import {
  LuBug,
  LuCloudy,
  LuDatabase,
  LuGithub,
  LuListChecks,
  LuListTree,
  LuNetwork,
  LuPencilRuler,
  LuSearchCode,
  LuSendToBack,
  LuShuffle,
} from 'react-icons/lu';

const features = [
  {
    name: 'CSPM',
    icon: (props) => <LuListChecks {...props} />,
  },
  {
    name: 'Inventory',
    icon: (props) => <LuBug {...props} />,
  },
  {
    name: 'Remediation',
    icon: (props) => <LuShuffle {...props} />,
  },
  {
    name: 'Cloud asset inventory',
    icon: (props) => <LuDatabase {...props} />,
  },
  {
    name: 'Compliance checks',
    icon: (props) => <LuListChecks {...props} />,
  },
  {
    name: 'Resource relationships',
    icon: (props) => <LuSendToBack {...props} />,
  },
  {
    name: 'Agentless coverage',
    icon: (props) => <LuDatabase {...props} />,
  },
  {
    name: 'Security graph',
    icon: (props) => <LuNetwork {...props} />,
  },
  {
    name: 'Multi-cloud visibility',
    icon: (props) => <LuCloudy {...props} />,
  },
  {
    name: 'Open source',
    icon: (props) => <LuGithub {...props} />,
  },
  {
    name: 'Data model',
    icon: (props) => <LuListTree {...props} />,
  },
  {
    name: 'Customization',
    icon: (props) => <LuPencilRuler {...props} />,
  },
  {
    name: 'Full-text search',
    icon: (props) => <LuSearchCode {...props} />,
  },
];

const Motivation = ({ blok }) => (
  <>
    <dl
      className="motivation mx-auto mt-8 grid max-w-xl grid-cols-1 gap-10 sm:mt-12 lg:max-w-none lg:grid-cols-3"
      {...storyblokEditable(blok)}
    >
      {blok.motivation_items.map((feature, index) => (
        <div
          key={`feature-${index}`}
          className="motivation__inner flex flex-col"
        >
          <dt className="motivation__header text-lg font-bold text-gray-900">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-marian-blue-50">
              {features.filter((f) => f.name === feature.caption)[0] &&
                features
                  .filter((f) => f.name === feature.caption)[0]
                  .icon({
                    className: 'h-6 w-6 text-cornflower-blue-600',
                    'aria-hidden': 'true',
                  })}
            </div>
            {feature.caption}
          </dt>
          <dd className="motivation__text mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
            <p className="flex-auto">{feature.text}</p>
          </dd>
        </div>
      ))}
    </dl>
  </>
);

export default Motivation;
