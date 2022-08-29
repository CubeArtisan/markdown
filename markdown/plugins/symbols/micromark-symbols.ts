import { codes } from 'micromark-util-symbol/codes';
import type { Code, Construct, Effects, State } from 'micromark-util-types';

const tokenizeSymbol = (effects: Effects, ok: State, nok: State): State => {
  const more = (code: Code) => {
    if (code === codes.rightCurlyBrace) {
      // '}'
      effects.exit('symbolValue');
      effects.enter('symbolEndMarker');
      effects.consume(code);
      effects.exit('symbolEndMarker');
      effects.exit('symbol');
      return ok;
    }

    if ((code ?? -1) < 0) {
      return nok(code);
    }
    effects.consume(code);
    return more;
  };

  const open = (code: Code) => {
    if ((code ?? -1) < 0) {
      return nok(code);
    }

    effects.enter('symbolValue');
    effects.consume(code);
    return more;
  };

  return (code) => {
    if (code !== codes.leftCurlyBrace) {
      throw new Error('expected `{`');
    }
    effects.enter('symbol');
    effects.enter('symbolStartMarker');
    effects.consume(code);
    effects.exit('symbolStartMarker');
    return open;
  };
};

const symbol: Construct = {
  tokenize: tokenizeSymbol,
};

export default {
  text: {
    [codes.leftCurlyBrace]: symbol,
  },
};
