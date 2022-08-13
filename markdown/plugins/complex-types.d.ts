import type { CardRow } from '@cubeartisan/markdown/plugins/cardrow/mdast-cardrow';
import type { CardLiteral } from '@cubeartisan/markdown/plugins/cardlink/mdast-cardlink';
import type { SymbolLiteral } from '@cubeartisan/markdown/plugins/symbol/mdast-symbols';
import type { UserLinkLiteral } from '@cubeartisan/markdown/plugins/userlink/mdast-userlink';
import type { CenteringLiteral } from '@cubeartisan/markdown/plugins/centering/mdast-centering';

declare module 'mdast' {
  // eslint-disable-next-line no-unused-vars
  interface BlockContentMap {
    cardrow: CardRow;
    centering: CenteringLiteral;
  }

  // eslint-disable-next-line no-unused-vars
  interface StaticPhrasingContentMap {
    symbol: SymbolLiteral;
    userlink: UserLinkLiteral;
    cardimage: CardLiteral;
  }

  // eslint-disable-next-line no-unused-vars
  interface PhrasingContentMap {
    cardlink: CardLiteral;
  }
}
