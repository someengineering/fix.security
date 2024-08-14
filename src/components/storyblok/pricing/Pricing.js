import { storyblokEditable } from '@storyblok/react';
import {
  LuBuilding,
  LuBuilding2,
  LuCheck,
  LuPersonStanding,
  LuWarehouse,
} from 'react-icons/lu';

import ButtonLink from '@/components/common/links/ButtonLink';
import { cn } from '@/utils/css';

const Pricing = ({ blok }) => {
  if (!blok || !blok.body) {
    return <div>Pricing blok incorrect: {JSON.stringify(blok)}</div>;
  }
  const icons = [
    {
      name: 'Free',
      icon: (props) => <LuPersonStanding {...props} />,
    },
    {
      name: 'Plus',
      icon: (props) => <LuWarehouse {...props} />,
    },
    {
      name: 'Business',
      icon: (props) => <LuBuilding {...props} />,
    },
    {
      name: 'Enterprise',
      icon: (props) => <LuBuilding2 {...props} />,
    },
  ];

  return (
    <>
      <div
        className="mx-auto mt-20 grid max-w-md grid-cols-1 items-stretch gap-8 text-left md:max-w-3xl md:grid-cols-2"
        {...storyblokEditable(blok)}
      >
        {blok.body.map((tier, index) => (
          <div
            key={`tier-${tier.name}`}
            className={cn(
              tier.mostPopular
                ? 'ring-2 ring-cornflower-blue-600'
                : 'ring-1 ring-gray-200',
              'flex flex-col rounded-2xl p-8',
            )}
          >
            <h3
              id={`tier-${tier.name}`}
              className="flex items-center gap-3 text-3xl font-bold text-cornflower-blue-600"
            >
              {icons.filter((it) => it.name === tier.name)[0].icon()}
              {tier.name}
              {tier.mostPopular ? (
                <span className="inline-flex items-center whitespace-nowrap rounded-md bg-marian-blue-50 px-2 py-1 text-xs">
                  Most popular
                </span>
              ) : null}
            </h3>

            <p className="mt-6 text-base font-medium leading-6 text-gray-900">
              {tier.description}
            </p>

            <div className="my-8 border-b border-gray-900/10 pb-8 text-base">
              <p className="flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {tier.price}
                </span>
              </p>
              {tier.price_description.length === 1 ? (
                <p className="mt-0.5 font-semibold text-gray-600">
                  {tier.price_description[0].value}
                </p>
              ) : (
                tier.price_description.map((pd, index) =>
                  index === 0 ? (
                    <p key={index} className="mt-0.5">
                      {pd.value}
                    </p>
                  ) : (
                    <p key={index}>{pd.value}</p>
                  ),
                )
              )}
            </div>

            <div className="gap-y-2 text-base">
              {tier.scans.map((scan, index) => (
                <p key={index}>{scan.value}</p>
              ))}
            </div>
            <p className="mt-6 text-base font-semibold text-gray-900">
              {index === 0
                ? 'Features:'
                : `Everything in ${blok.body[index - 1].name}, and:`}
            </p>
            <ul
              role="list"
              className="mt-1.5 space-y-1.5 text-sm leading-6 text-gray-600 md:min-h-36"
            >
              {tier.price_feature_items.map((feature, index) => (
                <li
                  key={`feature-${tier.name}-${index}`}
                  className="flex gap-x-2"
                >
                  <LuCheck
                    className="my-0.5 h-5 w-5 flex-none text-cornflower-blue-600"
                    aria-hidden="true"
                  />
                  {feature.value}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base font-semibold text-gray-900">
              Support:
            </p>
            <ul
              role="list"
              className="mt-1.5 grow space-y-1.5 text-sm leading-6 text-gray-600"
            >
              {tier.support_items.map((option, index) => (
                <li
                  key={`support-${tier.name}-${index}`}
                  className="flex gap-x-2"
                >
                  <LuCheck
                    className="my-0.5 h-5 w-5 flex-none text-cornflower-blue-600"
                    aria-hidden="true"
                  />
                  {option.value}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={tier.href}
              variant={tier.mostPopular ? 'default' : 'outline'}
              className="mt-9 block text-center"
            >
              {tier.cta}
            </ButtonLink>
          </div>
        ))}
      </div>
    </>
  );
};

export default Pricing;
