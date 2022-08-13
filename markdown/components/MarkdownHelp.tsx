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
import PropTypes from 'prop-types';
import { Box, BoxProps, Grid, Link, Paper, Typography } from '@mui/material';

import Markdown from './Markdown.js';

const Header = (props: BoxProps = {}) => <Box color="background.darker" {...props} />;

const Body = (props: BoxProps = {}) => <Box {...props} />;

export const MarkdownHelp = ({ siteName, CardLink, CardImage, ExternalLink }) => (
  <Paper elevation={2} sx={{ marginY: 3, marginX: 4 }}>
    <Header>
      <Typography variant="h4">Markdown Guide</Typography>
    </Header>
    <Body>
      <Typography variant="body1">
        {siteName} supports regular Markdown as well as some extra features specific to our site. If you need any help
        regarding how to use markdown, please <Link href="/contact">contact us</Link>.
      </Typography>
      <Typography variant="h5">Contents</Typography>
      <ol>
        <li>
          <Link href="#formatting">Basic Formatting</Link>
        </li>
        <li>
          <Link href="#cards">Linking Cards</Link>
        </li>
        <li>
          <Link href="#symbols">Symbols</Link>
        </li>
        <li>
          <Link href="#users">Tagging Users</Link>
        </li>
        <li>
          <Link href="#latex">LaTeX</Link>
        </li>
        <li>
          <Link href="#strikethrough">Strikethrough</Link>
        </li>
        <li>
          <Link href="#centering">Centering</Link>
        </li>
        <li>
          <Link href="#tables">Tables</Link>
        </li>
        <li>
          <Link href="#tasklists">Task Lists</Link>
        </li>
        <li>
          <Link href="#syntax">Syntax Highlighting</Link>
        </li>
      </ol>
    </Body>
    <Body className="border-top">
      <Typography variant="h5" id="formatting">
        Basic Formatting
      </Typography>
      <Typography variant="body1">
        Our Markdown syntax is based on the CommonMark specification, which includes all the common Markdown constructs
        you may already be familiar with. <Link href="https://commonmark.org/help/">Learn more.</Link>
      </Typography>
    </Body>
    <Body className="border-top">
      <Typography variant="h5" id="cards">
        Linking Cards
      </Typography>
      <Typography variant="body1">
        There are multiple ways to link cards. To link a card with autocard, you can use double square brackets to wrap
        a card name, like so:
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>[[Ambush Viper]]</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown="[[Ambush Viper]]"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">
        You can put the card in whatever case you want. It will always link to the {siteName} card page. If you want to
        link to a specific version, you can supply a{' '}
        <Link href="https://scryfall.com/docs/api/cards/id" target="_blank" rel="noopener noreferrer">
          Scryfall ID
        </Link>
        . These IDs can be found from the URL of card pages, for the version you are looking for. The text displayed
        will be whatever is to the left of the pipe (|).For example:
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>[[Old Border Mystic Snake|f098a28c-5f9b-4a2c-b109-c342365eb948]]</code>
                <br />
                <code>[[New Border Mystic Snake|38810fe4-dc72-439e-adf7-362af772b8f8]]</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
                markdown={
                  '[[Old Border Mystic Snake|f098a28c-5f9b-4a2c-b109-c342365eb948]]\n[[New Border Mystic Snake|38810fe4-dc72-439e-adf7-362af772b8f8]]'
                }
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">
        To use a double-faced card autocard, add a slash to beginning of the card name. This also works with linking
        specific IDs.
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>[[/Delver of Secrets]]</code>
                <br />
                <code>[[/Delver of Secrets|28059d09-2c7d-4c61-af55-8942107a7c1f]]</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
                markdown={'[[/Delver of Secrets]]\n[[/Delver of Secrets|28059d09-2c7d-4c61-af55-8942107a7c1f]]'}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">
        You can display card images by adding a exclamation point before the card name. These images scale with the
        width of the screen, so try it out on different screen widths to make sure you're happy with it, like so:
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <code>[[!Hexdrinker]]</code>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown="[[!Hexdrinker]]"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">For DFCs, you can similarly add a slash to get the back side in autocard.</Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>[[!/Delver of Secrets]]</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown="[[!/Delver of Secrets]]"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">
        If you want to display card images alongside each other in a row, you'll need to wrap those card images with
        double angle brackets. This feature is not available for blog posts. Take the following example:
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>[[!Hexdrinker]][[!Lotus Cobra]][[!Snake]]</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown="[[!Hexdrinker]][[!Lotus Cobra]][[!Snake]]"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>{'<<[[!Hexdrinker]][[!Lotus Cobra]][[!Snake]]>>'}</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown="<<[[!Hexdrinker]][[!Lotus Cobra]][[!Snake]]>>"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
    </Body>
    <Body className="border-top">
      <Typography variant="h5" id="symbols">
        Symbols
      </Typography>
      <Typography variant="body1">Symbols can be added using curly braces. Most MTG symbols are supported.</Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>{'{W}{U}{B}{R}{G}'}</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown="{W}{U}{B}{R}{G}"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">Create hybrid symbols by including a slash.</Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>{'{W/U}{G/U}{B/R}{R/W}{B/G}'}</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown="{W/U}{G/U}{B/R}{R/W}{B/G}"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">Similarly, we can do hybrid color/2 colorless symbols, and Phrexian mana.</Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>{'{2/W}{2/U}{2/B}{2/R}{2/G}'}</code>
                <br />
                <code>{'{W/P}{U/P}{B/P}{R/P}{G/P}'}</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown={'{2/W}{2/U}{2/B}{2/R}{2/G}\n{W/P}{U/P}{B/P}{R/P}{G/P}\n'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">
        There are many more symbols available. Anything you'd see in a text box, we should support. For example:
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>{'{e}{T}{q}{s}{X}{Y}{15}'}</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown="{e}{T}{q}{s}{X}{Y}{15}"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
    </Body>
    <Body className="border-top">
      <Typography variant="h5" id="users">
        Linking Users
      </Typography>
      <Typography variant="body1">You can link to a user by adding an @ before the username.</Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>This suggestion was made by @dekkaru</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown="This suggestion was made by @dekkaru"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
    </Body>
    <Body className="border-top">
      <Typography variant="h5" id="latex">
        LaTeX
      </Typography>
      <Typography variant="body1">
        You can add LaTeX math expressions using '$' for inline LaTeX, and double '$' on a separate line for block
        LaTeX.
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>{'Some inline latex here $\\frac{\\sum_{i=1}^N x_i}{N}$ text after'}</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown={'Some inline latex here $\\frac{\\sum_{i=1}^N x_i}{N}$ text after'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>$$</code>
                <br />
                <code>{'frac{\\sum_{i=1}^N x_i}{N}'}</code>
                <br />
                <code>$$</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown={'$$\n\\frac{\\sum_{i=1}^N x_i}{N}\n$$'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">You can use LaTeX in headers, and in block quotes as well.</Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>{'> $\\frac{\\sum_{i=1}^N x_i}{N}$'}</code>
                <br />
                <code>{'### $\\frac{\\sum_{i=1}^N x_i}{N}$'}</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown={'> $\\frac{\\sum_{i=1}^N x_i}{N}$'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
              <br />
              <Markdown
                markdown={'### $\\frac{\\sum_{i=1}^N x_i}{N}$'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
    </Body>
    <Body className="border-top">
      <Typography variant="h5" id="strikethrough">
        Strikethrough
      </Typography>
      <Typography variant="body1">For strikethrough text, wrap the text in double tilde.</Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>~~This text is strikethrough~~</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown="~~This text is strikethrough~~"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
    </Body>
    <Body className="border-top">
      <Typography variant="h5" id="centering">
        Centering
      </Typography>
      <Typography variant="body1">You can center elements by wrapping them in triple angle brackets.</Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>{`>>> This text is centered <<<`}</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown=">>> This text is centered <<<"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">
        You can center card images, titles and multi-line paragraphs as well. All other Markdown tags can be used in a
        centered block.
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>{`>>> Centered Card: [[!Hexdrinker]] <<<`}</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown=">>> Centered Card: [[!Hexdrinker]] <<<"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>
                  {`>>>`} <br />
                  ### Centered heading <br />
                  {`<<<`}
                </code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown={`>>>\n#### Centered heading\n<<<`}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>
                  {`>>>`} <br />
                  Centered paragraph <br />
                  spanning <br />
                  multiple <br />
                  lines <br />
                  {`<<<`} <br />
                </code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown={`>>>\nCentered paragraph\nspanning\nmultiple\nlines\n<<<`}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
    </Body>
    <Body className="border-top">
      <Typography variant="h5" id="tables">
        Tables
      </Typography>
      <Typography variant="body1">
        Tables consist of a header row, a delimiter row, and one or more data rows. The separators between columns don't
        have to be vertically aligned, but it helps readability.
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>| W | U | B | R | G |</code>
                <br />
                <code>|---|---|---|---|---|</code>
                <br />
                <code>| 15| 7 | 12| 35| 0 |</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown={'| W | U | B | R | G |\n|---|---|---|---|---|\n| 15| 7 | 12| 35| 0 |'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">
        The delimiter row can optionally contain semicolons indicating right, center, or left alignment. Table cells
        also support basic formatting.
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>| Left align | Center align | Right align |</code>
                <br />
                <code>| :--------- | :----------: | ----------: |</code>
                <br />
                <code>| Aligned left | Aligned center | Aligned right |</code>
                <br />
                <code>{`| {W}{U}{B}{R} | [[Hexdrinker]] | *emphasized* |`}</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
                markdown={
                  '| Left align | Center align | Right align |\n| :--------- | :----------: | ----------: |\n|Aligned left|Aligned center|Aligned right|\n|{W}{U}{B}{R}|[[Hexdrinker]]| *emphasized*|'
                }
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
    </Body>
    <Body className="border-top">
      <Typography variant="h5" id="tasklists">
        Task Lists
      </Typography>
      <Typography variant="body1">Adding brackets to a list turns it into a task list.</Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>- [x] Completed item.</code>
                <br />
                <code>- [ ] Not completed item.</code>
                <br />
                <code>&nbsp;&nbsp;- [x] Task lists can be nested.</code>
                <br /> <br />
                <code>1. [x] Numbered task.</code>
                <br />
                <code>2. [ ] Unfinished numbered task.</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
                markdown={
                  '- [x] Completed item.\n- [ ] Not completed item.\n  - [x] Task lists can be nested.\n\n1. [x] Numbered task.\n2. [ ] Unfinished numbered task.'
                }
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
    </Body>
    <Body className="border-top">
      <Typography variant="h5" id="syntax">
        Syntax Highlighting
      </Typography>
      <Typography variant="body1">
        When writing a code block, specifying a language will enable syntax highlighting for that language. You can
        specify{' '}
        <Link href="https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_HLJS.MD">
          the following languages.
        </Link>
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Source</Header>
            <Body>
              <Typography variant="body1">
                <code>```javascript</code>
                <br />
                <code>{'const x = { a: b+1 };'}</code>
                <br />
                <code>console.log(this);</code>
                <br />
                <code>```</code>
              </Typography>
            </Body>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={4}>
            <Header>Result</Header>
            <Body>
              <Markdown
                markdown={'```js\nconst x = { a: b+1 };\nconsole.log(this);\n```'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </Body>
          </Paper>
        </Grid>
      </Grid>
    </Body>
  </Paper>
);
MarkdownHelp.propTypes = {
  siteName: PropTypes.string.isRequired,
  CardLink: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  CardImage: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  ExternalLink: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
MarkdownHelp.defaultProps = {
  ExternalLink: 'a',
};
export default MarkdownHelp;
