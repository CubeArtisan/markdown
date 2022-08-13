/* eslint-disable no-restricted-imports */
import { markdownSpace, markdownLineEnding } from 'micromark-util-character';
import { factorySpace } from 'micromark-factory-space';
import { types } from 'micromark-util-symbol/types';
import { codes } from 'micromark-util-symbol/codes';
import type { Code, Construct, Effects, Point, State, TokenizeContext } from 'micromark-util-types';

import { shallowEqual } from '../utils.js';

const centering = () => {
  let shouldEnd = false;
  let isOneLine = false;
  let endMark: Point | undefined;

  const oneLineConstruct: Construct = { partial: true, tokenize: (_0: Effects, ok: State) => ok };

  const tokenizeCentering = (effects: Effects, ok: State, nok: State) => {
    let size = 0;

    const markOneLine = (code: Code) => {
      isOneLine = true;
      return ok(code);
    };

    const after = (code: Code) => {
      if (size < 3) return nok(code);
      if (markdownSpace(code)) {
        return factorySpace(effects, after, types.whitespace)(code);
      }
      return effects.attempt(oneLineConstruct, markOneLine, ok)(code);
    };

    const sequence = (code: Code) => {
      if (code === codes.greaterThan) {
        size += 1;
        effects.consume(code);
        return sequence;
      }
      effects.exit('centeringPrefix');
      return after(code);
    };

    return (code: Code) => {
      if (code !== codes.greaterThan) {
        throw new Error('expected `>`');
      }
      effects.enter('centering', { _container: true });
      effects.enter('centeringPrefix');
      return sequence(code);
    };
  };

  const tokenizeCenteringEnd = (effects: Effects, ok: State, nok: State) => {
    let size = 0;

    const after = (code: Code) => {
      if (markdownSpace(code)) {
        return factorySpace(effects, after, types.whitespace)(code);
      }

      if (code === codes.eof || markdownLineEnding(code)) {
        return size === 3 ? ok(code) : nok(code);
      }

      return nok(code);
    };

    const sequence = (code: Code) => {
      if (code === codes.lessThan) {
        size += 1;
        effects.consume(code);
        return sequence;
      }

      effects.exit('centeringSuffix');
      return after(code);
    };

    return (code: Code) => {
      effects.enter('centeringSuffix');
      return sequence(code);
    };
  };

  const endingConstruct = { tokenize: tokenizeCenteringEnd, partial: true };

  oneLineConstruct.tokenize = (effects: Effects, ok: State, nok: State) => {
    const end = (code: Code) => {
      effects.exit('centeringLineValue');
      return effects.attempt(endingConstruct, ok)(code);
    };

    let consumeLt: State;

    const content = (code: Code) => {
      if (code === codes.lessThan) {
        return effects.check(endingConstruct, end, consumeLt)(code);
      }
      if (!code || markdownLineEnding(code)) {
        return nok(code);
      }
      effects.consume(code);
      return content;
    };

    consumeLt = (code: Code) => {
      if (code !== codes.lessThan) {
        throw new Error('expected `<`');
      }
      effects.consume(code);
      return content;
    };

    return (code) => {
      effects.enter('centeringLineValue', { contentType: 'flow' });
      return content(code);
    };
  };

  function tokenizeCenteringContinuation(this: TokenizeContext, effects: Effects, ok: State, nok: State): State {
    if (isOneLine) return nok;
    const now = this.now();

    const markEnd = (code: Code) => {
      // we want to include the closing fence in the block, but exit on the next line
      shouldEnd = true;
      // marking the point before the fence so that it can be checked in parent function.
      endMark = now;
      return ok(code);
    };
    // the tokenization can be callled twice on the same input, so we have to check where we are as well
    // otherwise the second invocation on the closing fence would return nok, which we don't want
    if (shouldEnd && !shallowEqual(now, endMark)) return nok;
    return factorySpace(effects, effects.attempt(endingConstruct, markEnd, ok), types.linePrefix, 4);
  }

  const exit = (effects: Effects) => {
    effects.exit('centering');
    shouldEnd = false;
    isOneLine = false;
    endMark = undefined;
  };

  return {
    tokenize: tokenizeCentering,
    continuation: { tokenize: tokenizeCenteringContinuation },
    exit,
  } as Construct;
};

export default {
  document: {
    [codes.greaterThan]: centering(),
  },
};
