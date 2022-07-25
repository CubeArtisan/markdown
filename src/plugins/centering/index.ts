import syntax from '@cubeartisan/markdown/plugins/centering/micromark-centering';
import { fromMarkdown } from '@cubeartisan/markdown/plugins/centering/mdast-centering';
import { add } from '@cubeartisan/markdown/plugins/utils';

function centering() {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default centering;
