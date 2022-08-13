/* eslint-disable no-restricted-imports */
import type { Node } from 'unist';
import type { Processor, Transformer } from 'unified';
import { visit } from 'unist-util-visit';

import syntax from './micromark-cardlink.js';
import { CardLiteral, fromMarkdown } from './mdast-cardlink.js';
import { add } from '../utils.js';

function oncard(node: CardLiteral) {
  if (node.value[0] === '!') {
    node.value = node.value.substring(1);
    node.type = 'cardimage';
  }

  if (node.value[0] === '/') {
    node.value = node.value.substring(1);
    node.dfc = true;
  }

  if (node.value[0] === '!' && node.type !== 'cardimage') {
    node.value = node.value.substring(1);
    node.type = 'cardimage';
  }

  [node.name, node.id] = node.value.split('|');
  if (typeof node.id === 'undefined') node.id = node.name;
}

// eslint-disable-next-line no-unused-vars
function cardlinks(this: Processor<void, Node>): Transformer {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
  return (tree) => visit(tree, 'cardlink', oncard);
}

export default cardlinks;
