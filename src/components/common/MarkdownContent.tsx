import Markdown from 'react-markdown';

import PrimaryLink from '@/components/common/links/PrimaryLink';
import NextImage from '@/components/common/NextImage';

import { sanitizeMarkdown } from '@/utils/hashnode';

export default function MarkdownContent({ children }: { children?: string }) {
  if (!children) {
    return null;
  }

  return (
    <Markdown
      components={{
        a: (props) => (
          <PrimaryLink href={props.href ?? ''}>{props.children}</PrimaryLink>
        ),
        h1: 'h2',
        h2: (props) => {
          const { node: _node, ...rest } = props;
          return (
            <h2
              {...rest}
              className="mb-8 mt-16 text-2xl font-bold tracking-tight text-gray-900"
            />
          );
        },
        h3: (props) => {
          const { node: _node, ...rest } = props;
          return (
            <h3
              {...rest}
              className="mb-8 mt-12 text-xl font-bold tracking-tight text-gray-900"
            />
          );
        },
        h4: (props) => {
          const { node: _node, ...rest } = props;
          return (
            <h4
              {...rest}
              className="my-8 text-lg font-bold tracking-tight text-gray-900"
            />
          );
        },
        h5: (props) => {
          const { node: _node, ...rest } = props;
          return (
            <h5
              {...rest}
              className="my-8 text-base font-bold tracking-tight text-gray-900"
            />
          );
        },
        h6: (props) => {
          const { node: _node, ...rest } = props;
          return (
            <h6
              {...rest}
              className="my-8 text-base font-bold italic tracking-tight text-gray-900"
            />
          );
        },
        img: (props) => (
          <NextImage
            src={props.src ?? ''}
            alt={props.alt ?? ''}
            title={props.title}
            className="h-max w-full"
            classNames={{
              image: 'h-auto w-auto object-contain mx-auto rounded-xl',
            }}
            width={0}
            height={0}
            sizes="350vw"
          />
        ),
        ol: (props) => {
          const { node: _node, ...rest } = props;
          return (
            <ol
              {...rest}
              className="mb-8 ml-8 mt-4 list-outside list-decimal space-y-4 text-gray-600"
            />
          );
        },
        p: (props) => {
          const { node: _node, ...rest } = props;
          return <p {...rest} className="my-8" />;
        },
        ul: (props) => {
          const { node: _node, ...rest } = props;
          return (
            <ul
              {...rest}
              className="mb-8 ml-8 mt-4 list-outside list-decimal space-y-4 text-gray-600"
            />
          );
        },
      }}
    >
      {sanitizeMarkdown(children)}
    </Markdown>
  );
}
