/* eslint-disable no-restricted-imports */
import { Markdown } from './components/index.js';

export interface MarkdownCard {
  name: string;
  cardID?: string | null;
}

export const cardMarkdown = ({ name, cardID = null }: MarkdownCard) => {
  if (cardID) {
    return `[[${name}|${cardID}]]`;
  }
  return `[[${name}]]`;
};

export const addCardMarkdown = (card: MarkdownCard) => `{+} ${cardMarkdown(card)}`;

export const removeCardMarkdown = (card: MarkdownCard) => `{-} ${cardMarkdown(card)}`;

export const replaceCardMarkdown = (oldCard: MarkdownCard, newCard: MarkdownCard) =>
  `{→} ${cardMarkdown(oldCard)} → ${cardMarkdown(newCard)}`;

export { MarkdownHelp, Markdown } from './components/index.js';

export { findUserLinks } from './plugins/index.js';

export * as plugins from './plugins/index.js';

export default Markdown;
