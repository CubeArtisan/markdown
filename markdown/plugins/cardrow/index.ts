/* eslint-disable no-restricted-imports */
import type { Node } from 'unist';
import type { Processor } from 'unified';

import syntax from './micromark-cardrow.js';
import { fromMarkdown } from './mdast-cardrow.js';
import { add } from '../utils.js';

// eslint-disable-next-line no-unused-vars
function cardrow(this: Processor<void, Node>): void {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default cardrow;
