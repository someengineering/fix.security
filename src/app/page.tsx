'use client';

import * as React from 'react';
import { InlineWidget } from 'react-calendly';
import { LuBug, LuCheck, LuListChecks, LuShip } from 'react-icons/lu';

import ButtonLink from '@/components/links/ButtonLink';

import { siteConfig } from '@/constant/config';

// const navigation = [
//   { name: 'Product', href: '#' },
//   { name: 'Pricing', href: '#' },
//   { name: 'Resources', href: '#' },
//   { name: 'About Us', href: '#' },
// ];

const features: {
  name: string;
  description: string;
  icon: (
    props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
  ) => JSX.Element;
}[] = [
  {
    name: 'Complete cloud risk visibility',
    description:
      'Fix builds an up-to-date representation of your cloud infrastructure on a regular schedule. View all resources in one place, for quicker insights and informed decision-making.',
    icon: (props) => <LuListChecks {...props} />,
  },
  {
    name: 'Cloud-native solution',
    description:
      'With a single deployment and one data layer, Fix eliminates the need to stitch together fragmented tools.',
    icon: (props) => <LuShip {...props} />,
  },
  {
    name: 'Address risks that matter',
    description:
      'Fix asseses vulnerabilities and misconfigurations based on severity, exposure, exploitability, blast radius, and business impact.',
    icon: (props) => <LuBug {...props} />,
  },
];

const pricingTiers: {
  name: string;
  id: string;
  price: string;
  priceUnit?: string;
  priceDescription?: string;
  description: string;
  features: string[];
}[] = [
  {
    name: 'Cloud',
    id: 'tier-cloud',
    price: '$5',
    priceUnit: 'cloud account, per month',
    description:
      'For security teams who want a hosted solution and are budget-conscious.',
    features: [
      'CSPM',
      'Daily scans',
      'ChatOps integrations',
      'Workflow integrations',
      'API access',
      'Premium support',
    ],
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    price: 'Custom',
    priceDescription: 'per-resource pricing',
    description:
      'For security teams in large enterprises or regulated industries who want on-prem deployment.',
    features: [
      'Everything in Cloud',
      'Custom scan frequency',
      'Cloud asset inventory',
      'Technical account manager',
    ],
  },
];

export default function HomePage() {
  // const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-16 sm:py-24 lg:py-28">
          <div className="text-center">
            <div className="balanced mb-6 rounded-full text-2xl font-semibold leading-6 text-gray-600">
              {siteConfig.subtitle}
            </div>
            <h1 className="balanced text-4xl font-bold tracking-tight text-primary-900 sm:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="balanced mt-6 text-lg leading-8 text-gray-600">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <ButtonLink href="#request-early-access" variant="secondary">
                Request early access
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              This is a big benefit for the user
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              This sentence explains the big benefit for the user a bit more in
              detail, across two rows of text.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="isolate py-24 sm:py-32" id="pricing">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-base font-semibold leading-7 text-primary-700">
              Pricing
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Build securely in the cloud, without breaking the bank.
            </p>
          </div>
          <div className="relative mt-6">
            <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600">
              Fix has usage-based pricing. There are no minimum commitments for
              the Cloud tier, and we also offer the option to self-host our
              open-source product for free. Our goal is to give everyone great
              cloud security, regardless of budget.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 lg:mt-24 lg:px-8">
          <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
              >
                <div>
                  <h3
                    id={tier.id}
                    className="text-xl font-semibold leading-7 text-primary-900"
                  >
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {tier.price}
                    </span>
                    {tier.priceUnit ? (
                      <span className="text-base font-semibold leading-7 text-gray-600">
                        / {tier.priceUnit}
                      </span>
                    ) : null}
                    {tier.priceDescription ? (
                      <span className="text-base font-semibold leading-7 text-gray-600">
                        {tier.priceDescription}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-6 text-base leading-7 text-gray-600">
                    {tier.description}
                  </p>
                  <ul
                    role="list"
                    className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <LuCheck
                          className="h-6 w-5 flex-none text-primary-900"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <ButtonLink
                  href="#request-early-access"
                  variant="secondary"
                  className="mt-8 block text-center"
                >
                  Request early access
                </ButtonLink>
              </div>
            ))}
            <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
              <div className="lg:min-w-0 lg:flex-1">
                <h3 className="text-xl font-semibold leading-8 text-primary-900">
                  Free Self-Hosted
                </h3>
                <p className="mt-1 text-base leading-7 text-gray-600">
                  For software engineers and SREs who are also in charge of
                  security.
                </p>
              </div>
              <ButtonLink
                href="#request-early-access"
                variant="outline"
                className="block"
              >
                Request early access <span aria-hidden="true">&rarr;</span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-primary-900 px-6 py-24 sm:px-6 sm:py-32 lg:px-8"
        id="request-early-access"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Request early access.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum
            anim id veniam aliqua proident excepteur commodo do ea.
          </p>
        </div>
        <div className="mt-10 flex h-[64rem] items-center justify-center sm:h-[68rem] md:mt-0 xl:h-[44rem]">
          <InlineWidget
            url="https://calendly.com/larskamp/fix-early-access"
            pageSettings={{
              primaryColor: 'd77e08',
            }}
            styles={{
              flexGrow: 1,
              height: '100%',
              width: '100%',
              minWidth: '320px',
            }}
          />
        </div>
      </div>
    </>
  );
}
