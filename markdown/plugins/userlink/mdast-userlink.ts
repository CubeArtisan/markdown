import type { Literal } from 'mdast';
import type { CompileContext, Extension, Token } from 'mdast-util-from-markdown';

export interface UserLinkLiteral extends Literal {
  type: 'userlink';
  value: string;
}

function enterUserlink(this: CompileContext, token: Token) {
  this.enter({ type: 'userlink', value: '' } as UserLinkLiteral, token);
  this.buffer();
}

function enterUserlinkValue(this: CompileContext, token: Token) {
  this.config.enter.data.call(this, token);
}

function exitUserlinkValue(this: CompileContext, token: Token) {
  this.config.exit.data.call(this, token);
}

function exitUserlink(this: CompileContext, token: Token) {
  const data = this.resume();
  const node = this.exit(token);
  node.value = data;
}

export const fromMarkdown: Extension = {
  enter: { userlink: enterUserlink, userlinkValue: enterUserlinkValue },
  exit: { userlink: exitUserlink, userlinkValue: exitUserlinkValue },
};
