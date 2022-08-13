import { markdownLineEndingOrSpace } from 'micromark-util-character';
import type { Code, Effects, State, TokenizeContext } from 'micromark-util-types';
import { codes } from 'micromark-util-symbol/codes';

function tokenizeUserlink(this: TokenizeContext, effects: Effects, ok: State, nok: State): State {
  const self = this;

  const more = (code: Code) => {
    if (/[a-zA-Z0-9]/.test(String.fromCharCode(code ?? 0))) {
      effects.consume(code);
      return more;
    }
    effects.exit('userlinkValue');
    effects.exit('userlink');
    return ok(code);
  };

  // make sure at least one alphanum. char is after the '@'
  const open = (code: Code) => {
    if (/[a-zA-Z0-9]/.test(String.fromCharCode(code ?? 0))) {
      effects.enter('userlinkValue');
      effects.consume(code);
      return more;
    }
    return nok(code);
  };

  return (code: Code) => {
    if (code !== codes.atSign) {
      throw new Error('expected `@`');
    }
    // '@' shouldn't be preceded by an actual character
    if (!self.previous || markdownLineEndingOrSpace(self.previous)) {
      effects.enter('userlink');
      effects.enter('userlinkMarker');
      effects.consume(code);
      effects.exit('userlinkMarker');
      return open;
    }

    return nok(code);
  };
}

const userlink = {
  tokenize: tokenizeUserlink,
};

export default {
  text: {
    [codes.atSign]: userlink, // '@'
  },
};
