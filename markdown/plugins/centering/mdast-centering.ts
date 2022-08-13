import type { Literal } from 'mdast';
import type { CompileContext, Extension, Token } from 'mdast-util-from-markdown';

export interface CenteringLiteral extends Literal {
  type: 'centering';
  children: any[];
}

function enterCentering(this: CompileContext, token: Token) {
  this.enter({ type: 'centering', children: [] as any[] } as CenteringLiteral, token);
}

function exitCentering(this: CompileContext, token: Token) {
  this.exit(token);
}

export const fromMarkdown: Extension = {
  enter: { centering: enterCentering },
  exit: { centering: exitCentering },
};
