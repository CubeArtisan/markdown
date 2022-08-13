import { codes } from 'micromark-util-symbol/codes';
import { markdownLineEnding } from 'micromark-util-character';
import { splice } from 'micromark-util-chunked';
import type { Construct, ContentType, Effects, Event, State, TokenizeContext } from 'micromark-util-types';

const resolveCardrow = (events: Array<Event>, context: TokenizeContext) => {
  const contentEnd = 4;
  const contentStart = 3;

  if (contentEnd <= contentStart) {
    throw new Error('content cannot end before it starts');
  }
  const text = {
    type: 'chunkText',
    start: events[contentStart][1].start,
    end: events[contentEnd][1].end,
    contentType: 'text' as ContentType,
  };

  splice(events, contentEnd, 0, [['exit', text, context]]);
  splice(events, contentStart + 1, 0, [['enter', text, context]]);
  return events;
};

function tokenizeEnd(this: TokenizeContext, effects: Effects, ok: State, nok: State): State {
  const end = (code: number | null) => {
    if (code === codes.greaterThan) {
      effects.consume(code);
      effects.exit('cardrowEndLabel');
      return ok;
    }

    return nok(code);
  };

  return (code: number | null) => {
    if (code === codes.greaterThan) {
      effects.exit('cardrowContent');
      effects.enter('cardrowEndLabel');
      effects.consume(code);
      return end;
    }

    return nok(code);
  };
}

const tokenizeCardrow = (effects: Effects, ok: State, nok: State): State => {
  const closingConstruct = { tokenize: tokenizeEnd, partial: true };

  let content: State;

  const consumeGt = (code: number | null) => {
    if (code !== codes.greaterThan) {
      throw new Error('expected `>`');
    }
    effects.consume(code);
    return content;
  };

  const after = (code: number | null) => {
    effects.exit('cardrow');
    return ok(code);
  };

  content = (code: number | null) => {
    if (code === codes.greaterThan) {
      return effects.attempt(closingConstruct, after, consumeGt)(code);
    }

    if (!code || markdownLineEnding(code)) {
      return nok(code);
    }

    effects.consume(code);
    return content;
  };

  const contentStart = (code: number | null) => {
    if (!code || markdownLineEnding(code) || code === codes.greaterThan) {
      return nok(code);
    }

    return content(code);
  };

  const openingSequence = (code: number | null) => {
    if (code === codes.lessThan) {
      effects.consume(code);
      effects.exit('cardrowStartLabel');
      effects.enter('cardrowContent');
      return contentStart;
    }

    return nok(code);
  };

  return (code: number | null) => {
    if (code !== codes.lessThan) {
      throw new Error('expected `<`');
    }
    effects.enter('cardrow');
    effects.enter('cardrowStartLabel');
    effects.consume(code);
    return openingSequence;
  };
};

const cardrow: Construct = {
  tokenize: tokenizeCardrow,
  resolve: resolveCardrow,
};

export default {
  text: {
    [codes.lessThan]: cardrow,
  },
};
