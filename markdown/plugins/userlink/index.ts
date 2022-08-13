/* eslint-disable no-restricted-imports */
import type { Node } from 'unist';
import type { Processor, Transformer } from 'unified';
import { visit } from 'unist-util-visit';

import syntax from './micromark-userlink.js';
import { fromMarkdown, UserLinkLiteral } from './mdast-userlink.js';
import { add } from '../utils.js';

// eslint-disable-next-line consistent-return
function userlink(this: Processor<void, Node>, options: any = {}): Transformer | void {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);

  function visitor(node: UserLinkLiteral) {
    options.callback(node.value);
  }

  if (typeof options.callback === 'function') {
    return (tree) => visit(tree, 'userlink', visitor);
  }
}

export default userlink;
