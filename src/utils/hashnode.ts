import React from 'react';

import { UserFragment as HashnodeUser } from '@/generated/hashnode/graphql';

const userTitleMapping: Record<string, string> = {
  fixteam: '',
  lloesche: 'Co-founder & CISO at Fix Security',
  scapecast: 'Co-founder & CEO at Fix Security',
  aquamatthias: 'Co-founder & CTO at Fix Security',
};

export const getUserTitle = (user: HashnodeUser): string | undefined => {
  if (user.username in userTitleMapping) {
    return userTitleMapping[user.username];
  }

  return 'Engineer';
};

export const getUserLink = (user: HashnodeUser): string | undefined => {
  const socialMediaLinks = user.socialMediaLinks;

  return socialMediaLinks?.linkedin ?? undefined;
};

export const sanitizeMarkdown = (markdown: string): string => {
  return markdown
    .replace(/\s+align="\w+"/g, '')
    .replace(/]\(https?:\/\/(www\.)?fix\.(security|tt)\/?/g, '](/')
    .replace(/]\(https?:\/\/blog\.fix\.(security|tt)\/?/g, '](/blog/')
    .replace(
      /%\[https:\/\/youtu\.be\/(?<videoId>[\w\d\-_]{11})]/g,
      '::youtube[$<videoId>]',
    );
};

export const getText = (element: React.ReactNode): string => {
  if (element) {
    switch (typeof element) {
      case 'string':
      case 'number':
        return element.toString();

      case 'object':
        if (element instanceof Array) {
          return element
            .map((child: React.ReactNode) => getText(child))
            .join('');
        }

        if ('props' in element) {
          return getText(element.props.children);
        }
    }
  }

  return '';
};
