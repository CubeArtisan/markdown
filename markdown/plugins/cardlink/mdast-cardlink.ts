import type { Literal } from 'mdast';
import type { CompileContext, Extension, Token } from 'mdast-util-from-markdown';

export interface CardLiteral extends Literal {
  type: 'cardlink' | 'cardimage';
  value: string;
  dfc: boolean;
  name: string;
  id?: string;
}

function enterCardlink(this: CompileContext, token: Token) {
  this.enter({ type: 'cardlink', value: '', name: '', dfc: false } as CardLiteral, token);
  this.buffer();
}

function enterCardlinkValue(this: CompileContext, token: Token) {
  this.config.enter.data.call(this, token);
}

function exitCardlinkValue(this: CompileContext, token: Token) {
  this.config.exit.data.call(this, token);
}

function exitCardlink(this: CompileContext, token: Token) {
  const data = this.resume();
  const node = this.exit(token);
  node.value = data;
}

export const fromMarkdown: Extension = {
  enter: { cardlink: enterCardlink, cardlinkValue: enterCardlinkValue },
  exit: { cardlink: exitCardlink, cardlinkValue: exitCardlinkValue },
};
