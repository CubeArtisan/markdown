/* eslint-disable no-restricted-imports */
/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */
import { unified } from 'unified';
import headings from 'remark-autolink-headings';
import breaks from 'remark-breaks';
import gfm from 'remark-gfm';
import math from 'remark-math';
import remark from 'remark-parse';
import slug from 'remark-slug';

import type { PluggableList } from 'react-markdown/lib/react-markdown.js';
import cardlink from './cardlink/index.js';
import cardrow from './cardrow/index.js';
import centering from './centering/index.js';
import symbols from './symbols/index.js';
import userlink from './userlink/index.js';

const VALID_SYMBOLS = 'wubrgcmtsqepxyz/-0123456789->+→';

const FUNCTION_PLUGINS: PluggableList = [cardrow, centering, math, cardlink];

const ARRAY_PLUGINS: PluggableList = [
  [gfm, { singleTilde: false }],
  [symbols, { allowed: VALID_SYMBOLS }],
];

const BASE_PLUGINS: PluggableList = [...FUNCTION_PLUGINS, ...ARRAY_PLUGINS];

export const LIMITED_PLUGINS = [...BASE_PLUGINS, userlink, breaks];

export const ALL_PLUGINS = [...LIMITED_PLUGINS, slug, headings];

export const findUserLinks = (text: string): string[] => {
  const mentions: string[] = [];
  const processor = unified()
    .use(remark)
    .use(BASE_PLUGINS)
    .use(userlink, { callback: (name: string) => mentions.push(name) });
  processor.runSync(processor.parse(text));
  return mentions;
};

export default {
  findUserLinks,
  VALID_SYMBOLS,
  BASE_PLUGINS,
  LIMITED_PLUGINS,
  ALL_PLUGINS,
  cardrow,
  centering,
  cardlink,
  symbols,
  userlink,
};
