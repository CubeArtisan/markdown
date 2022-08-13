import type { Literal } from 'mdast';
import type { CompileContext, Extension, Token } from 'mdast-util-from-markdown';

export interface CardRow extends Literal {
  type: 'cardrow';
  children: any[];
}

function enterCardrow(this: CompileContext, token: Token) {
  this.enter({ type: 'cardrow', children: [] as any[] } as CardRow, token);
}

function exitCardrow(this: CompileContext, token: Token) {
  this.exit(token);
}

export const fromMarkdown: Extension = {
  enter: { cardrow: enterCardrow },
  exit: { cardrow: exitCardrow },
};
