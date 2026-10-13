# Test framework conventions

Every new test must follow these rules. Reviewers reject tests that don't.

## Structure
| Layer | Folder | Rule |
|---|---|---|
| Environments | `config/environments.js` | Never hard-code URLs. `baseURL` and currency come from `TEST_ENV`. |
| Test data | `data/` | Tests reference data by key (`products.iphone`), never by literal strings. |
| Components | `components/` | UI shared across pages (e.g. `Toast`). Page objects use them; tests never do. |
| Page objects | `pages/` | One per page, extending `BasePage`. All locators live here. |
| Custom matchers | `utils/assertions.js` | Team assertions such as `toBePrice()`. |
| Fixtures | `fixtures/test-base.js` | Page objects, test data and journey fixtures (e.g. `cartWithIphone`). |
| Tests | `tests/<area>/<feature>.spec.js` | One user journey per file. |

## Rules
1. **Reuse before you add.** Check `pages/`, `components/` and the fixtures first. Add a page object only for a page that has none.
2. **No raw locators in tests.** Tests call page-object methods only.
3. **Import from the fixture:** `const { test, expect } = require('../../fixtures/test-base')`, never from `@playwright/test`. Register every new page object in the fixture.
4. **Use journey fixtures for setup.** If a test needs a filled cart, use `cartWithIphone` instead of repeating the steps.
5. **Navigate with `gotoRoute`.** Never `page.goto` with a full URL.
6. **Tag every test:** an area tag on `describe` (`@catalogue`, `@cart`, `@compare`) and a level tag on `test` (`@smoke` or `@regression`).
7. **Web-first assertions only** (`toHaveText`, `toBeVisible`, `toBePrice`). No fixed sleeps.

## Commands
- `npm test` runs everything; `npm run test:smoke` runs `@smoke` only; `npm run test:staging` targets staging.
