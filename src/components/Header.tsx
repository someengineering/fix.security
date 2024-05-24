'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';

import '@/styles/globals.css';

import ButtonLink from '@/components/common/links/ButtonLink';

import Logo from '@/assets/logo.svg';
import { siteConfig } from '@/constants/config';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Docs', href: 'https://docs.fix.security' },
  { name: 'Blog', href: '/blog' },
  { name: 'Podcast', href: '/podcast' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:gap-x-12 lg:px-8">
        <div className="flex">
          <a
            href="/"
            className="-m-1.5 p-1.5 text-cornflower-blue-600 hover:text-cornflower-blue-700"
          >
            <span className="sr-only">{siteConfig.title}</span>
            <Logo className="h-16 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <LuMenu className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden text-base font-bold text-gray-700 lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="hover:text-gray-900">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden space-x-2 lg:flex lg:flex-1 lg:justify-end">
          <ButtonLink
            href="https://app.fix.security/auth/register"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start for free
          </ButtonLink>
          <ButtonLink
            href="https://app.fix.security/auth/login"
            variant="ghost"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log in
          </ButtonLink>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{siteConfig.title}</span>
              <Logo className="h-16 w-auto text-cornflower-blue-600 hover:text-cornflower-blue-700" />
            </a>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <LuX className="h-10 w-10" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-4 flow-root">
            <div className="divide-y divide-gray-500/10">
              <div className="space-y-6 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-lg font-bold text-gray-700 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="space-x-2 py-6">
                <ButtonLink
                  href="https://app.fix.security/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start for free
                </ButtonLink>
                <ButtonLink
                  href="https://app.fix.security/auth/login"
                  variant="ghost"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </ButtonLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
