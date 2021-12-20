import visit from 'unist-util-visit';
import syntax from '@cubeartisan/markdown/plugins/cardlink/micromark-cardlink';
import { fromMarkdown } from '@cubeartisan/markdown/plugins/cardlink/mdast-cardlink';
import { add } from '@cubeartisan/markdown/plugins/utils';

function oncard(node) {
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

function cardlinks() {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
  return (tree) => visit(tree, 'cardlink', oncard);
}

export default cardlinks;
