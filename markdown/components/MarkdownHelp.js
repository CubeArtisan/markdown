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
import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardHeader, Row, Col, CardBody } from 'reactstrap';

import Markdown from '@cubeartisan/markdown/components/Markdown.js';

export const MarkdownHelp = ({ siteName, CardLink, CardImage, ExternalLink }) => (
  <Card className="my-3 mx-4">
    <CardHeader>
      <h4>Markdown Guide</h4>
    </CardHeader>
    <CardBody>
      <p>
        {siteName} supports regular Markdown as well as some extra features specific to our site. If you need any help
        regarding how to use markdown, please <a href="/contact">contact us</a>.
      </p>
      <h5>Contents</h5>
      <ol>
        <li>
          <a href="#formatting">Basic Formatting</a>
        </li>
        <li>
          <a href="#cards">Linking Cards</a>
        </li>
        <li>
          <a href="#symbols">Symbols</a>
        </li>
        <li>
          <a href="#users">Tagging Users</a>
        </li>
        <li>
          <a href="#latex">LaTeX</a>
        </li>
        <li>
          <a href="#strikethrough">Strikethrough</a>
        </li>
        <li>
          <a href="#centering">Centering</a>
        </li>
        <li>
          <a href="#tables">Tables</a>
        </li>
        <li>
          <a href="#tasklists">Task Lists</a>
        </li>
        <li>
          <a href="#syntax">Syntax Highlighting</a>
        </li>
      </ol>
    </CardBody>
    <CardBody className="border-top">
      <h5 id="formatting">Basic Formatting</h5>
      <p>
        Our Markdown syntax is based on the CommonMark specification, which includes all the common Markdown constructs
        you may already be familiar with. <a href="https://commonmark.org/help/">Learn more.</a>
      </p>
    </CardBody>
    <CardBody className="border-top">
      <h5 id="cards">Linking Cards</h5>
      <p>
        There are multiple ways to link cards. To link a card with autocard, you can use double square brackets to wrap
        a card name, like so:
      </p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>[[Ambush Viper]]</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown="[[Ambush Viper]]"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>
        You can put the card in whatever case you want. It will always link to the {siteName} card page. If you want to
        link to a specific version, you can supply a{' '}
        <a href="https://scryfall.com/docs/api/cards/id" target="_blank" rel="noopener noreferrer">
          Scryfall ID
        </a>
        . These IDs can be found from the URL of card pages, for the version you are looking for. The text displayed
        will be whatever is to the left of the pipe (|).For example:
      </p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>[[Old Border Mystic Snake|f098a28c-5f9b-4a2c-b109-c342365eb948]]</code>
                <br />
                <code>[[New Border Mystic Snake|38810fe4-dc72-439e-adf7-362af772b8f8]]</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
                markdown={
                  '[[Old Border Mystic Snake|f098a28c-5f9b-4a2c-b109-c342365eb948]]\n[[New Border Mystic Snake|38810fe4-dc72-439e-adf7-362af772b8f8]]'
                }
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>
        To use a double-faced card autocard, add a slash to beginning of the card name. This also works with linking
        specific IDs.
      </p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>[[/Delver of Secrets]]</code>
                <br />
                <code>[[/Delver of Secrets|28059d09-2c7d-4c61-af55-8942107a7c1f]]</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
                markdown={'[[/Delver of Secrets]]\n[[/Delver of Secrets|28059d09-2c7d-4c61-af55-8942107a7c1f]]'}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>
        You can display card images by adding a exclamation point before the card name. These images scale with the
        width of the screen, so try it out on different screen widths to make sure you're happy with it, like so:
      </p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <code>[[!Hexdrinker]]</code>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown="[[!Hexdrinker]]"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>For DFCs, you can similarly add a slash to get the back side in autocard.</p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>[[!/Delver of Secrets]]</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown="[[!/Delver of Secrets]]"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>
        If you want to display card images alongside each other in a row, you'll need to wrap those card images with
        double angle brackets. This feature is not available for blog posts. Take the following example:
      </p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>[[!Hexdrinker]][[!Lotus Cobra]][[!Snake]]</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown="[[!Hexdrinker]][[!Lotus Cobra]][[!Snake]]"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>{'<<[[!Hexdrinker]][[!Lotus Cobra]][[!Snake]]>>'}</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown="<<[[!Hexdrinker]][[!Lotus Cobra]][[!Snake]]>>"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
    </CardBody>
    <CardBody className="border-top">
      <h5 id="symbols">Symbols</h5>
      <p>Symbols can be added using curly braces. Most MTG symbols are supported.</p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>{'{W}{U}{B}{R}{G}'}</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown="{W}{U}{B}{R}{G}"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>Create hybrid symbols by including a slash.</p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>{'{W/U}{G/U}{B/R}{R/W}{B/G}'}</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown="{W/U}{G/U}{B/R}{R/W}{B/G}"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>Similarly, we can do hybrid color/2 colorless symbols, and Phrexian mana.</p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>{'{2/W}{2/U}{2/B}{2/R}{2/G}'}</code>
                <br />
                <code>{'{W/P}{U/P}{B/P}{R/P}{G/P}'}</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown={'{2/W}{2/U}{2/B}{2/R}{2/G}\n{W/P}{U/P}{B/P}{R/P}{G/P}\n'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>There are many more symbols available. Anything you'd see in a text box, we should support. For example:</p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>{'{e}{T}{q}{s}{X}{Y}{15}'}</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown="{e}{T}{q}{s}{X}{Y}{15}"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
    </CardBody>
    <CardBody className="border-top">
      <h5 id="users">Linking Users</h5>
      <p>You can link to a user by adding an @ before the username.</p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>This suggestion was made by @dekkaru</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown="This suggestion was made by @dekkaru"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
    </CardBody>
    <CardBody className="border-top">
      <h5 id="latex">LaTeX</h5>
      <p>
        You can add LaTeX math expressions using '$' for inline LaTeX, and double '$' on a separate line for block
        LaTeX.
      </p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>{'Some inline latex here $\\frac{\\sum_{i=1}^N x_i}{N}$ text after'}</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown={'Some inline latex here $\\frac{\\sum_{i=1}^N x_i}{N}$ text after'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>$$</code>
                <br />
                <code>{'frac{\\sum_{i=1}^N x_i}{N}'}</code>
                <br />
                <code>$$</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown={'$$\n\\frac{\\sum_{i=1}^N x_i}{N}\n$$'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>You can use LaTeX in headers, and in block quotes as well.</p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>{'> $\\frac{\\sum_{i=1}^N x_i}{N}$'}</code>
                <br />
                <code>{'### $\\frac{\\sum_{i=1}^N x_i}{N}$'}</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </CardBody>
    <CardBody className="border-top">
      <h5 id="strikethrough">Strikethrough</h5>
      <p>For strikethrough text, wrap the text in double tilde.</p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>~~This text is strikethrough~~</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown="~~This text is strikethrough~~"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </CardBody>
    <CardBody className="border-top">
      <h5 id="centering">Centering</h5>
      <p>You can center elements by wrapping them in triple angle brackets.</p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>{`>>> This text is centered <<<`}</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown=">>> This text is centered <<<"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>
        You can center card images, titles and multi-line paragraphs as well. All other Markdown tags can be used in a
        centered block.
      </p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>{`>>> Centered Card: [[!Hexdrinker]] <<<`}</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown=">>> Centered Card: [[!Hexdrinker]] <<<"
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>
                  {`>>>`} <br />
                  ### Centered heading <br />
                  {`<<<`}
                </code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown={`>>>\n#### Centered heading\n<<<`}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>
                  {`>>>`} <br />
                  Centered paragraph <br />
                  spanning <br />
                  multiple <br />
                  lines <br />
                  {`<<<`} <br />
                </code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown={`>>>\nCentered paragraph\nspanning\nmultiple\nlines\n<<<`}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </CardBody>
    <CardBody className="border-top">
      <h5 id="tables">Tables</h5>
      <p>
        Tables consist of a header row, a delimiter row, and one or more data rows. The separators between columns don't
        have to be vertically aligned, but it helps readability.
      </p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>| W | U | B | R | G |</code>
                <br />
                <code>|---|---|---|---|---|</code>
                <br />
                <code>| 15| 7 | 12| 35| 0 |</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown={'| W | U | B | R | G |\n|---|---|---|---|---|\n| 15| 7 | 12| 35| 0 |'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <p>
        The delimiter row can optionally contain semicolons indicating right, center, or left alignment. Table cells
        also support basic formatting.
      </p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>| Left align | Center align | Right align |</code>
                <br />
                <code>| :--------- | :----------: | ----------: |</code>
                <br />
                <code>| Aligned left | Aligned center | Aligned right |</code>
                <br />
                <code>{`| {W}{U}{B}{R} | [[Hexdrinker]] | *emphasized* |`}</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
                markdown={
                  '| Left align | Center align | Right align |\n| :--------- | :----------: | ----------: |\n|Aligned left|Aligned center|Aligned right|\n|{W}{U}{B}{R}|[[Hexdrinker]]| *emphasized*|'
                }
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </CardBody>
    <CardBody className="border-top">
      <h5 id="tasklists">Task Lists</h5>
      <p>Adding brackets to a list turns it into a task list.</p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>- [x] Completed item.</code>
                <br />
                <code>- [ ] Not completed item.</code>
                <br />
                <code>&nbsp;&nbsp;- [x] Task lists can be nested.</code>
                <br /> <br />
                <code>1. [x] Numbered task.</code>
                <br />
                <code>2. [ ] Unfinished numbered task.</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
                markdown={
                  '- [x] Completed item.\n- [ ] Not completed item.\n  - [x] Task lists can be nested.\n\n1. [x] Numbered task.\n2. [ ] Unfinished numbered task.'
                }
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </CardBody>
    <CardBody className="border-top">
      <h5 id="syntax">Syntax Highlighting</h5>
      <p>
        When writing a code block, specifying a language will enable syntax highlighting for that language. You can
        specify{' '}
        <a href="https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_HLJS.MD">
          the following languages.
        </a>
      </p>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Source</CardHeader>
            <CardBody>
              <p>
                <code>```javascript</code>
                <br />
                <code>{'const x = { a: b+1 };'}</code>
                <br />
                <code>console.log(this);</code>
                <br />
                <code>```</code>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>Result</CardHeader>
            <CardBody>
              <Markdown
                markdown={'```js\nconst x = { a: b+1 };\nconsole.log(this);\n```'}
                CardLink={CardLink}
                CardImage={CardImage}
                ExternalLink={ExternalLink}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </CardBody>
  </Card>
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
