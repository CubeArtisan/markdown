import Markdown from '@cubeartisan/markdown/components/Markdown';

export const cardMarkdown = ({ name, cardID = null }) => {
  if (cardID) {
    return `[[${name}|${cardID}]]`;
  }
  return `[[${name}]]`;
};

export const addCardMarkdown = (card) => `{+} ${cardMarkdown(card)}`;

export const removeCardMarkdown = (card) => `{-} ${cardMarkdown(card)}`;

export const replaceCardMarkdown = (oldCard, newCard) => `{→} ${cardMarkdown(oldCard)} → ${cardMarkdown(newCard)}`;

export { findUserLinks } from '@cubeartisan/markdown/plugins';
export { MarkdownHelp } from '@cubeartisan/markdown/components/MarkdownHelp';
export default Markdown;
