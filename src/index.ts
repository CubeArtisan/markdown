import Markdown from '@cubeartisan/markdown/components/Markdown';
import MarkdownHelp from '@cubeartisan/markdown/components/MarkdownHelp';
import { findUserLinks } from '@cubeartisan/markdown/plugins';

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
