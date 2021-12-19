const symbols = (codes) => {
  const validCodes = codes?.toLowerCase() || '';

  const tokenizeSymbol = (effects, ok, nok) => {
    const more = (code) => {
      if (code === 125) {
        // '}'
        effects.exit('symbolValue');
        effects.enter('symbolEndMarker');
        effects.consume(code);
        effects.exit('symbolEndMarker');
        effects.exit('symbol');
        return ok;
      }

      if (code < 0) {
        return nok(code);
      }

      const c = String.fromCharCode(code).toLowerCase();
      if (validCodes.includes(c)) {
        effects.consume(code);
        return more;
      }

      return nok(code);
    };

    const open = (code) => {
      if (code < 0) {
        return nok(code);
      }

      const c = String.fromCharCode(code).toLowerCase();

      if (validCodes.includes(c)) {
        effects.enter('symbolValue');
        effects.consume(code);
        return more;
      }

      return nok(code);
    };

    return (code) => {
      if (code !== 123) {
        throw new Error('expected `{`');
      }
      effects.enter('symbol');
      effects.enter('symbolStartMarker');
      effects.consume(code);
      effects.exit('symbolStartMarker');
      return open;
    };
  };

  const symbol = {
    tokenize: tokenizeSymbol,
  };

  return {
    text: {
      123: symbol,
    },
  };
};

export default symbols;
