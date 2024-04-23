'use client';

import { Disclosure } from '@headlessui/react';
import { useMemo } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

import BlogPostTableOfContentsRow from '@/components/blog/BlogPost/BlogPostTableOfContents/BlogPostTableOfContentsRow';

import { TableOfContentsItemFragment as HashnodeTableOfContentsItem } from '@/generated/hashnode/graphql';

export type BlogPostTableOfContentsItem = {
  id: string;
  slug: string;
  title: string;
  level: number;
  parentId?: string | null;
  children: BlogPostTableOfContentsItem[];
};

export default function BlogPostTableOfContents({
  items,
}: {
  items: HashnodeTableOfContentsItem[];
}) {
  const tocTree: BlogPostTableOfContentsItem[] = useMemo(() => {
    {
      const processItem = (
        item: HashnodeTableOfContentsItem,
      ): BlogPostTableOfContentsItem => ({
        ...item,
        children: items
          .filter((i) => i.level === item.level + 1 && i.parentId === item.id)
          .map((child) => processItem(child)),
      });

      return items
        .filter((item) => item.level === 2)
        .map((item) => processItem(item));
    }
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <Disclosure
      as="nav"
      id="toc"
      className="my-8 rounded-2xl p-4 text-base ring-1 ring-gray-900/10"
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            as="h2"
            className="flex cursor-pointer justify-between font-bold"
          >
            Table of contents
            <span className="flex h-6 items-center">
              {open ? (
                <LuChevronUp className="h-5 w-5" aria-hidden="true" />
              ) : (
                <LuChevronDown className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
          </Disclosure.Button>
          <Disclosure.Panel as="ul" unmount={false} className="mt-4 space-y-2">
            {tocTree.map((item) => (
              <BlogPostTableOfContentsRow
                key={item.id}
                slug={item.slug}
                title={item.title}
                childItems={item.children}
              />
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
