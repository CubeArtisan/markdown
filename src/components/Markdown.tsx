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
import { createElement, lazy } from 'react';
import PropTypes from 'prop-types';
import { a11yLight, a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { Box, Grid, Link } from '@mui/material';
import { Add, ArrowRightAlt, Link as LinkIcon, Remove } from '@mui/icons-material';

import { LIMITED_PLUGINS, ALL_PLUGINS } from '@cubeartisan/markdown/plugins';
import { isInternalURL, isSamePageURL } from '@cubeartisan/markdown/plugins/utils';
import Suspense from '@cubeartisan/markdown/components/Suspense';

const ReactMarkdown = lazy(() => import('react-markdown'));
const Latex = lazy(() => import('react-latex'));
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const renderBlockQuote = (node) => (
  <Box sx={{ backgroundColor: 'background.dark', marginBottom: 16, 'p:last-child': { marginBottom: 0 } }}>
    {node.children}
  </Box>
);

const renderImage = (node) => (
  <Box component="img" sx={{ maxWidth: '100%' }} src={node.src} alt={node.alt} title={node.title} />
);

const renderLink = (ExternalLink) => {
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

const renderHeading = (node) => createElement(`h${node.level}`, node.node?.data?.hProperties ?? {}, node.children);

const renderCode = (node) => {
  const mode = getComputedStyle(document.body).getPropertyValue('--mode').trim();
  const style = mode === 'dark' ? a11yDark : a11yLight;

  return (
    <SyntaxHighlighter language={node.language || 'text'} style={style}>
      {node.value || ''}
    </SyntaxHighlighter>
  );
};

const renderTable = (node) => (
  <div className="table-responsive">
    <table className="table table-bordered">{node.children}</table>
  </div>
);

const renderMath = (node) => <Latex trusted={false} displayMode>{`$$ ${node.value} $$`}</Latex>;

const renderInlineMath = (node) => <Latex trusted={false}>{`$ ${node.value} $`}</Latex>;

const renderUserlink = (node) => {
  const name = node.value;
  return (
    <a href={`/user/${name}`} target="_blank" rel="noopener noreferrer">
      @{name}
    </a>
  );
};

const renderSymbol = (node) => {
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

const renderCentering = (node) => <div className="centered-markdown">{node.children}</div>;

const renderCardrow = (node) => (
  <Grid container sx={{ justifyContent: 'center' }}>
    {node.children.map((child, idx) => (
      <Grid item xs="auto" key={/* eslint-disable-line react/no-array-index-key */ idx}>
        {child}
      </Grid>
    ))}
  </Grid>
);

const Markdown = ({ markdown, limited, CardLink, CardImage, ExternalLink }) => {
  const markdownStr = markdown?.toString() ?? '';
  const RENDERERS = {
    // overridden defaults
    link: renderLink(ExternalLink),
    linkReference: renderLink,
    image: renderImage,
    imageReference: renderImage,
    blockquote: renderBlockQuote,
    heading: renderHeading,
    code: renderCode,
    table: renderTable,
    // plugins
    math: renderMath,
    inlineMath: renderInlineMath,
    userlink: renderUserlink,
    symbol: renderSymbol,
    cardlink: CardLink,
    cardimage: CardImage,
    centering: renderCentering,
    cardrow: renderCardrow,
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactMarkdown className="markdown" plugins={limited ? LIMITED_PLUGINS : ALL_PLUGINS} renderers={RENDERERS}>
        {markdownStr}
      </ReactMarkdown>
    </Suspense>
  );
};
Markdown.propTypes = {
  markdown: PropTypes.string.isRequired,
  limited: PropTypes.bool,
  CardLink: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  CardImage: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  ExternalLink: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
Markdown.defaultProps = {
  ExternalLink: 'a',
};
Markdown.defaultProps = {
  limited: false,
};

export default Markdown;
