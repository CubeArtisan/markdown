/* eslint-disable no-restricted-imports */
import type { Node } from 'unist';
import type { Processor } from 'unified';

import syntax from './micromark-centering.js';
import { fromMarkdown } from './mdast-centering.js';
import { add } from '../utils.js';

// eslint-disable-next-line no-unused-vars
function centering(this: Processor<void, Node>) {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default centering;
