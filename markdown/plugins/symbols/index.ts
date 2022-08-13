/* eslint-disable no-restricted-imports */
import type { Node } from 'unist';
import type { Processor } from 'unified';

import syntax from './micromark-symbols.js';
import { fromMarkdown } from './mdast-symbols.js';
import { add } from '../utils.js';

function symbols(this: Processor<void, Node>, options: any): void {
  if (!options?.allowed) {
    console.warn('[remark-symbols] Warning: no symbols specified!');
  }

  const data = this.data();
  const valid = options?.allowed || '';
  add(data, 'micromarkExtensions', syntax(valid));
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default symbols;
