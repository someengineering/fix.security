import React, { ReactNode } from 'react';

import PrimaryLink from '@/components/common/links/PrimaryLink';

export default function Heading({
  as: As,
  children,
  slug,
  ...props
}: {
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  slug: string;
  children: ReactNode;
}) {
  const hashLinkLabel = `Direct link to “${children?.toString()}”`;

  return (
    <As {...props} id={slug}>
      {children}{' '}
      <PrimaryLink
        href={`#${slug}`}
        className="hash-link"
        aria-label={hashLinkLabel}
        title={hashLinkLabel}
      >
        &#8203;
      </PrimaryLink>
    </As>
  );
}
