import { codes } from 'micromark-util-symbol/codes';
import type { Code, Construct, Effects, State, TokenizeContext } from 'micromark-util-types';

function tokenizeCardlink(this: TokenizeContext, effects: Effects, ok: State, nok: State): State {
  const end = (code: Code) => {
    if (code === codes.rightSquareBracket) {
      effects.consume(code);
      effects.exit('cardlinkEndLabel');
      effects.exit('cardlink');
      return ok;
    }

    return nok(code);
  };

  const close = (code: Code) => {
    if (code !== codes.rightSquareBracket) {
      return nok(code);
    }

    effects.enter('cardlinkEndLabel');
    effects.consume(code);
    return end;
  };

  function value(code: Code) {
    if (!code || code < 0) {
      return nok(code);
    }

    if (code === codes.rightSquareBracket) {
      effects.exit('cardlinkValue');
      return close(code);
    }

    effects.consume(code);
    return value;
  }

  function valueStart(code: Code) {
    if (code === codes.rightSquareBracket) {
      return nok(code);
    }

    effects.enter('cardlinkValue');
    return value(code);
  }

  function open(code: Code) {
    if (code !== codes.leftSquareBracket) {
      return nok(code);
    }

    effects.consume(code);
    effects.exit('cardlinkStartLabel');
    return valueStart;
  }

  return (code: Code) => {
    if (code !== codes.leftSquareBracket) {
      throw new Error('expected `[`');
    }
    effects.enter('cardlink');
    effects.enter('cardlinkStartLabel');
    effects.consume(code);
    return open;
  };
}

const cardlink: Construct = {
  tokenize: tokenizeCardlink,
};

export default {
  text: {
    [codes.leftSquareBracket]: cardlink,
  },
};
