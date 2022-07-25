import syntax from '@cubeartisan/markdown/plugins/cardrow/micromark-cardrow';
import { fromMarkdown } from '@cubeartisan/markdown/plugins/cardrow/mdast-cardrow';
import { add } from '@cubeartisan/markdown/plugins/utils';

function cardrow() {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default cardrow;
