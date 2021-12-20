import Markdown from '@cubeartisan/markdown/components/Markdown.js';
import MarkdownHelp from '@cubeartisan/markdown/components/MarkdownHelp.js';
import { findUserLinks } from '@cubeartisan/markdown/plugins/index.js';

export const cardMarkdown = ({ name, cardID = null }) => {
  if (cardID) {
    return `[[${name}|${cardID}]]`;
  }
  return `[[${name}]]`;
};

export const addCardMarkdown = (card) => `{+} ${cardMarkdown(card)}`;

export const removeCardMarkdown = (card) => `{-} ${cardMarkdown(card)}`;

export const replaceCardMarkdown = (oldCard, newCard) => `{→} ${cardMarkdown(oldCard)} → ${cardMarkdown(newCard)}`;

export { findUserLinks, MarkdownHelp };

export default Markdown;
