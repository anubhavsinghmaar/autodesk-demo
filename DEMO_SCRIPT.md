# Autodesk technical demo (Thursday, 10 to 11 PM IST)

**Who:** Sudarsan Rao (Consulting Software Developer), Michael (Senior Software Engineer), Anjali (Principal Engineer), possibly the two core engineers who missed the July call. From us: Anubhav (leads), Misbah (account), Shantanu (if joining).

**Why this call exists (from the 10 July meeting):**
- Autodesk has its own execution, dashboards, debugging and test repos, and a large Playwright framework reused across teams. They will not replace it.
- They want help **authoring** new tests that **reuse and extend** that framework. Cursor and Claude generate tests but ignore the framework.
- The July ask for this follow-up: **show Kane CLI handling a complex existing Playwright framework, not simple URL flows.**
- Sudarsan: if framework integration is shown, they'd consider a POC or joint MVP on one Autodesk application.
- Relationship: Autodesk is also mid-POC with LambdaTest cloud for the Construction Cloud team.

## Before the call: confirm with Shantanu and Misbah (must do)

1. **"Test suite context" and "application code context."** In July we said these would ship in July. They are not in Kane CLI 0.8.22 docs or `--help`. Agree what we say: shipped, behind a flag, or on the roadmap. **Do not improvise this answer.**
2. **"Auto-heal works on externally executed tests."** The export imports `@testmuai/playwright-bindings` with `autoHealVersion: "AH2"`, so healing appears to come through those bindings. Confirm: does it still heal once the test is rewritten into their page objects (without `testmu.step`), and does it need TestMu AI credentials at run time?
3. **"177,000 to 2,000 tokens versus Claude alone."** Confirm the source before repeating it.
4. **POC owner:** Misbah or the SE owns follow-ups and the POC from day one.

## Setup (30 minutes before)

- VS Code on `~/Desktop/autodesk-demo`, branch `main`. Claude Code panel and terminal panel open. Font large, notifications off.
- Tabs ready: Flow A `test.js` export, `tests/cart/add-to-cart.spec.js`, `fixtures/test-base.js`, this script.
- Browser: Flow A Test Manager link.
- `kane-cli whoami` shows signed in. Do not upgrade Kane CLI before the call.

## Agenda (60 minutes)

| Time | Section |
|---|---|
| 0 to 5 | Recap their ask in their words |
| 5 to 12 | Tour their kind of framework (ours) |
| 12 to 20 | Flow A: Kane CLI on its own |
| 20 to 35 | Flow B: Kane CLI with Claude Code extends the framework |
| 35 to 40 | What is built in today, and the POC proposal |
| 40 to 60 | Discovery questions and next steps |

## 1. Recap (5 min)

> "In July you said your framework is large, shared across teams and built for reuse, and that the tools you've tried write tests that ignore it. Your engineers asked to see Kane CLI work with a complex framework, not simple URL flows. So today everything happens inside a team-style Playwright framework, and every new test has to pass your kind of code review."

## 2. Framework tour (7 min)

Show the folders: `config/` (environments), `data/` (test data), `components/` (shared UI), `pages/` (page objects on `BasePage`), `utils/assertions.js` (custom `toBePrice` matcher), `fixtures/test-base.js` (page objects, data, journey fixture `cartWithIphone`), `tests/catalogue` and `tests/cart`, `CONVENTIONS.md`.

Run:

```bash
npm test
```

**7 passed.**

> "This is a smaller version of what you described: layered, conventions enforced in review. The question is whether new tests reuse this or ignore it."

## 3. Flow A: Kane CLI on its own (8 min)

Already run. Show the saved terminal output, the Test Manager link, and the export:
`.testmuai/tests/output-2026-10-13T12-30-17/playwright-javascript-code/test.js`

Optional live re-run (about a minute):

```bash
kane-cli run "Search for iPhone, open the iPhone product, add it to the cart, then open the cart and verify it contains iPhone" --url https://ecommerce-playground.lambdatest.io --code-language javascript
```

Put `test.js` next to `tests/cart/add-to-cart.spec.js`.

> "Plain English in, a real browser run, a verified verdict with evidence, Playwright code out. Notice each step keeps its intent, like 'Clicking Add to Cart button for iPhone purchase', and the TestMu AI Playwright bindings carry auto-heal (`autoHealVersion: AH2`). But it's standalone code: no page objects, no team fixture. On its own it wouldn't pass your review. That's the gap you described."

## 4. Flow B: extend the framework (15 min)

**Show the result from the rehearsal run, do not run it live** (the full run takes several minutes):

```bash
git checkout demo-solution
```

Walk through:
1. `pages/ProductPage.js`: one new method, `addToCompare()`, reusing the shared `Toast`.
2. `pages/ComparePage.js`: a new page object extending `BasePage`, only for what didn't exist.
3. `fixtures/test-base.js`: `comparePage` registered.
4. `tests/compare/compare.spec.js`: reuses `homePage`, `searchResults`, `productPage`, `cartPage` and `products` data, tagged `@compare @regression`, no raw locators.
5. The raw Kane CLI export next to the final test: same verified steps, rewritten into the framework.

Run:

```bash
npm test
```

**8 passed.**

> "Claude Code read the framework and conventions. Kane CLI proved the journey in a real browser first, so the steps are grounded, not guessed. Claude then fitted it into the framework, reusing what existed and adding one page object. Your execution, dashboards and CI don't change, and the same flow works in Cursor."

Then `git checkout main`.

## 5. What is built in today, and the POC (5 min)

Say what was agreed with Shantanu on point 1 above. Default if not yet shipped:

> "Today the framework awareness comes from the coding agent you already use, guided by your conventions and project context. Kane CLI makes every new test grounded in a verified run. Native test-suite context in Kane CLI is [status agreed with Shantanu]."

**POC proposal (as discussed with Bobby in July):** one Autodesk application, a sanitized slice of the real framework, about 2 weeks. Success: for example, 5 new tests that reuse existing page objects, pass their CI and are accepted in code review. Owner on our side: [Misbah / SE].

## 6. Discovery questions

1. TypeScript or JavaScript? Layers: page objects, components, fixtures, data, custom runner or reporter?
2. How big is it, and how many teams contribute?
3. Which application for the POC? Can we get a sanitized slice of the repo?
4. What does "integrates with our framework" mean in review terms: reuse, style, lint, CI?
5. Which coding agent does the team standardise on: Cursor, Claude Code, both?
6. How do you handle test data and environments today?
7. Who joins the POC, and on what timeline?

## Likely questions

| They ask | Answer |
|---|---|
| Did the test suite context feature ship? | The answer agreed with Shantanu. Never guess. |
| Does it replace our runner or dashboards? | No. Final tests run in your own Playwright setup and CI. Kane CLI can run fully standalone and locally. |
| TypeScript? | Kane CLI exports JavaScript; the coding agent converts to TypeScript while fitting it into your framework. |
| Where does our code go? | Your repository. Authoring runs are local; tests live in your codebase. |
| Self-healing on our own runs? | The answer agreed with Shantanu. |
| Cost? | Kane CLI uses credits per authoring run. Pricing follows up through [Misbah]. |
| Mobile? | Kane CLI also runs native Android and iOS apps on emulators and simulators. Happy to show separately. |

## After the call

Send a recap the same day: agreed POC scope, owners, dates, and every open question with an owner and a response date.
