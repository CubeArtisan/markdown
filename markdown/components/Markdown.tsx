/* eslint-disable no-restricted-imports */
/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */
import { ComponentType, createElement, FC, lazy, ReactNode, Suspense } from 'react';
import PropTypes from 'prop-types';
import { a11yLight, a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { Box, CircularProgress, Grid, Link, Typography, useTheme } from '@mui/material';
import { Add, ArrowRightAlt, Link as LinkIcon, Remove } from '@mui/icons-material';
import type { Blockquote, Image } from 'mdast';

import type { CodeProps, HeadingProps } from 'react-markdown/lib/ast-to-react.js';
import { LIMITED_PLUGINS, ALL_PLUGINS, remarkRehypeOptions } from '../plugins/index.js';
import { isInternalURL, isSamePageURL } from '../plugins/utils.js';
import type { UserLinkLiteral } from '../plugins/userlink/mdast-userlink.js';
import type { SymbolLiteral } from '../plugins/symbols/mdast-symbols.js';
import type { CenteringLiteral } from '../plugins/centering/mdast-centering.js';
import type { CardRow } from '../plugins/cardrow/mdast-cardrow.js';
import type { CardLiteral } from '../plugins/cardlink/mdast-cardlink.js';

const ReactMarkdown = lazy(() => import('react-markdown'));
const Latex = lazy(() => import('react-latex'));
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const renderBlockQuote = (node: Blockquote) => (
  <Box sx={{ backgroundColor: 'background.dark', marginBottom: 16, 'p:last-child': { marginBottom: 0 } }}>
    {node.children}
  </Box>
);

const renderImage = (node: Image) => (
  <Box component="img" sx={{ maxWidth: '100%' }} src={node.url ?? ''} alt={node.alt ?? ''} title={node.title ?? ''} />
);

const renderLink = (renderExternalLink: ComponentType<{ href: string; children: ReactNode }>) => {
  const RenderLink = ({ href, children, node }) => {
    const ref = href ?? '';

    if (isInternalURL(ref)) {
      // heading autolink
      if (node.data?.hChildren) {
        return (
          <LinkIcon
            sx={{
              float: 'left',
              marginLeft: -24,
              paddingRight: 8,
              verticalAlign: 'middle',
              textDecoration: 'none',
              visibility: 'hidden',
              'parent:hover .child': { verticalAlign: 'middle !important', visibility: 'visible' },
            }}
          />
        );
      }

      const props = isSamePageURL(ref) ? {} : { target: '_blank', rel: 'noopener noreferrer' };
      return (
        <Link href={ref} {...props}>
          {children}
        </Link>
      );
    }
    const ExternalLink = renderExternalLink;

    return (
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
      <ExternalLink href={ref}>{children}</ExternalLink>
    );
  };
  RenderLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node,
    node: PropTypes.shape({
      data: PropTypes.shape({
        hChildren: PropTypes.bool,
      }),
    }),
  };
  RenderLink.defaultProps = {
    children: null,
    node: { data: null },
  };
  return RenderLink;
};

const renderHeading = (node: HeadingProps) =>
  createElement(`h${node.level}`, node.node?.data?.hProperties ?? {}, node.children);

interface CodeNodeProps {
  language?: string;
  value?: string;
}

const CodeNode: FC<CodeNodeProps> = ({ language, value }) => {
  const theme = useTheme();
  const style = theme?.palette?.mode === 'dark' ? a11yDark : a11yLight;

  return (
    <SyntaxHighlighter language={language ?? 'text'} style={style}>
      {value ?? ''}
    </SyntaxHighlighter>
  );
};
CodeNode.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string,
};
CodeNode.defaultProps = {
  language: 'text',
  value: '',
};

const renderCode = ({ language, value }: CodeProps) => <CodeNode language={language} value={value} />;

const renderTable = (node: { children: ReactNode }) => (
  <div className="table-responsive">
    <table className="table table-bordered">{node.children}</table>
  </div>
);

const renderMath = (node: { value: string }) => <Latex trust={false} displayMode>{`$$ ${node.value} $$`}</Latex>;

const renderInlineMath = (node: { value: string }) => <Latex trust={false}>{`$ ${node.value} $`}</Latex>;

const renderUserlink = (node: UserLinkLiteral) => {
  const name = node.value;
  return (
    <a href={`/user/${name}`} target="_blank" rel="noopener noreferrer">
      @{name}
    </a>
  );
};

const renderSymbol = (node: SymbolLiteral) => {
  if (node.value === '->' || node.value === '→') {
    return <ArrowRightAlt color="primary" />;
  }
  if (node.value === '-') {
    return <Remove color="error" />;
  }
  if (node.value === '+') {
    return <Add color="success" />;
  }
  const symbol = node.value.replace('/', '-').toLowerCase();
  return <Box component="img" sx={{ height: 22 }} src={`/content/symbols/${symbol}.png`} alt={symbol} />;
};

const renderCentering = (node: CenteringLiteral) => <div className="centered-markdown">{node.children}</div>;

const renderCardrow = (node: CardRow) => (
  <Grid container sx={{ justifyContent: 'center' }}>
    {node.children.map((child, idx) => (
      <Grid item xs="auto" key={/* eslint-disable-line react/no-array-index-key */ idx}>
        {child}
      </Grid>
    ))}
  </Grid>
);

const renderParagraph = (props) => <Typography paragraph variant="body1" {...props} />;

interface MarkdownPropTypes {
  markdown: string;
  limited?: boolean;
  renderCardLink: ComponentType<CardLiteral>;
  renderCardImage: ComponentType<CardLiteral>;
  renderExternalLink: ComponentType<{ href: string; children: ReactNode }>;
}

const Markdown: FC<MarkdownPropTypes> = ({
  markdown,
  limited,
  renderCardLink,
  renderCardImage,
  renderExternalLink,
}) => {
  const markdownStr = markdown?.toString() ?? '';
  const RENDERERS = {
    // overridden defaults
    a: renderLink(renderExternalLink),
    linkReference: renderLink,
    image: renderImage,
    imageReference: renderImage,
    blockquote: renderBlockQuote,
    heading: renderHeading,
    code: renderCode,
    table: renderTable,
    p: renderParagraph,
    // plugins
    math: renderMath,
    inlineMath: renderInlineMath,
    userlink: renderUserlink,
    symbol: renderSymbol,
    cardlink: renderCardLink,
    cardimage: renderCardImage,
    centering: renderCentering,
    cardrow: renderCardrow,
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <ReactMarkdown
        remarkPlugins={limited ? LIMITED_PLUGINS : ALL_PLUGINS /* @ts-ignore */}
        remarkRehypeOptions={remarkRehypeOptions}
        components={RENDERERS}
      >
        {markdownStr}
      </ReactMarkdown>
    </Suspense>
  );
};
Markdown.propTypes = {
  markdown: PropTypes.string.isRequired,
  limited: PropTypes.bool,
  renderCardLink: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  renderCardImage: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  renderExternalLink: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
Markdown.defaultProps = {
  renderExternalLink: Link,
};
Markdown.defaultProps = {
  limited: false,
};

export default Markdown;
