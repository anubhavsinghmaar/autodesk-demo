# Autodesk demo script (Thursday, 10 to 11 PM IST)

**Goal:** show that Kane CLI plus a coding agent can author new tests that **reuse and extend an existing Playwright framework**, and earn a POC.

**Setup, 30 minutes before the call**
- VS Code open on `~/Desktop/autodesk-demo`, with the Claude Code panel open and the terminal panel open.
- `kane-cli whoami` shows you signed in.
- Browser tabs: the Flow A evidence report, the Flow A exported JS file, this script.
- Notifications off. Terminal font large.
- Backup video ready to share if anything breaks.

## Agenda (60 minutes)

| Time | Section |
|---|---|
| 0 to 5 | Recap their ask |
| 5 to 15 | Flow A: Kane CLI on its own |
| 15 to 35 | Flow B: Kane CLI inside Claude Code, extending the framework |
| 35 to 40 | What's built in today, and the POC proposal |
| 40 to 60 | Discovery questions and next steps |

## 1. Recap (5 minutes)

> "In July you told us you have a large, shared Playwright framework and your own execution, dashboards and repo management, and you don't want to replace any of it. You want help **authoring** new tests, and the tools you've tried write tests that ignore your framework. Today I'll show a workflow where new tests reuse your page objects and patterns, and every test is proven in a real browser before it's written."

## 2. Flow A: Kane CLI on its own (10 minutes)

**Command** (run beforehand; re-run live if time allows, about a minute):

```bash
kane-cli run "Search for iPhone, open the iPhone product, add it to the cart, then open the cart and verify it contains iPhone" --url https://ecommerce-playground.lambdatest.io --code-language javascript
```

**Show:**
1. The objective in plain English, with no locators written.
2. The real browser run and the pass verdict.
3. The evidence: screenshots per step and the report.
4. The exported **Playwright JavaScript** file.

**Say:**
> "This is the core: plain English in, a real browser run, a verified verdict with evidence, and Playwright code out. But this exported code is generic. It doesn't know your framework. That's what the next part fixes."

## 3. Flow B: extend the framework with Claude Code (20 minutes)

**First, show the framework (2 minutes):** `pages/`, `fixtures/test-base.js`, `CONVENTIONS.md`, and one existing test. Then run `npx playwright test` to show 3 tests passing.

> "Think of this as your framework: shared page objects, a team fixture, conventions reviewers enforce."

**Prompt in Claude Code:**

> Add a new test for comparing products. The journey: compare iPhone and HTC Touch HD, check both appear on the Product Comparison page, then add iPhone to the cart from there and verify the cart contains it.
> First, read CONVENTIONS.md, pages/ and fixtures/test-base.js. Then use kane-cli to run this journey in a real browser and export the code as JavaScript. Finally, write the test in our framework style: reuse HomePage, ProductPage and CartPage, add a ComparePage only for what is new, register it in the fixture, and put the spec in tests/compare.spec.js. Run npx playwright test at the end.

**Show, in order:**
1. Claude reading the page objects and conventions.
2. The Kane CLI run: the flow proven in a real browser first.
3. The **raw export** next to the **final test**: same journey, but the final test reuses `HomePage`, `ProductPage` and `CartPage` and adds a small `ComparePage`.
4. The fixture updated with `comparePage`.
5. `npx playwright test`: **4 passed**.

**Say:**
> "Claude Code knows your code. Kane CLI knows your app in a real browser. Kane CLI proves the journey works; Claude fits it into your framework. Your execution, dashboards and CI don't change. The same flow works in Cursor."

If the live run stalls: switch to the backup video, or `git checkout demo-solution` to show the finished result.

## 4. Honest positioning and the POC (5 minutes)

> "To be clear: Kane CLI doesn't read your repository and generate code in your style by itself. The framework fit comes from the coding agent you already use, guided by your conventions. Kane CLI's job is to make sure every new test is grounded in a real, verified run, not guessed."

**POC proposal:** a 2-week POC on a sanitized slice of their framework. Success = for example, 5 new tests that reuse existing page objects, pass in their CI, and are accepted in their code review.

## 5. Discovery questions

1. Is the framework TypeScript or JavaScript? How is it structured: page objects, fixtures, helpers, a custom runner?
2. Roughly how large is it, and how many teams contribute?
3. Could a POC use a sanitized copy or a slice of the repo?
4. What would "integrates with our framework" mean for you: reusing page objects, matching code style, passing lint and review, running in your CI?
5. Which coding agent does the team standardise on: Cursor, Claude Code, or both?
6. Which application areas would you start with? Store, account management, product pages?
7. Who else should be involved in a POC, and what's a realistic timeline?

## Likely questions, short answers

| They ask | Answer |
|---|---|
| Does Kane CLI replace our runner or dashboards? | No. You run the final tests with your own Playwright setup and CI. |
| TypeScript? | Kane CLI exports JavaScript; the coding agent converts it to TypeScript as part of fitting it into your framework. |
| Where does our code go? | Your repository. Authoring runs use Kane CLI; your tests stay in your codebase. |
| What does it cost? | Kane CLI uses credits per authoring run. Pricing details go to [Misbah / SE] as a follow-up. |
| Mobile? | Kane CLI also runs native Android and iOS apps on emulators and simulators. Happy to show that separately. |
| Self-healing? | Kane CLI tests can heal when the UI changes. For tests that live in your framework, healing is on the Kane CLI side, not inside the exported code. |

## Follow-ups after the call
- Send a recap with the agreed POC scope, owners and dates. **The POC owner is [Misbah / SE].**
- Track every open question with an owner and a response date.
