import type { Literal } from 'mdast';
import type { CompileContext, Extension, Token } from 'mdast-util-from-markdown';

export interface SymbolLiteral extends Literal {
  type: 'symbol';
  value: string;
}

function enterSymbol(this: CompileContext, token: Token) {
  this.enter({ type: 'symbol', value: '' } as SymbolLiteral, token);
  this.buffer();
}

function enterSymbolValue(this: CompileContext, token: Token) {
  this.config.enter.data.call(this, token);
}

function exitSymbolValue(this: CompileContext, token: Token) {
  this.config.exit.data.call(this, token);
}

function exitSymbol(this: CompileContext, token: Token) {
  const data = this.resume();
  const node = this.exit(token);
  node.value = data;
}

export const fromMarkdown: Extension = {
  enter: { symbol: enterSymbol, symbolValue: enterSymbolValue },
  exit: { symbol: exitSymbol, symbolValue: exitSymbolValue },
};

export default { fromMarkdown };
