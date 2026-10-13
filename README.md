# autodesk-demo

A small Playwright (JavaScript) test framework used to demo **Kane CLI + Claude Code**: authoring new tests that reuse an existing framework instead of replacing it.

## Structure

| Path | What it holds |
|---|---|
| `pages/` | Page objects: `BasePage`, `HomePage`, `ProductPage`, `CartPage` |
| `fixtures/test-base.js` | Team fixture that injects page objects into every test |
| `tests/` | Existing specs: search, add to cart, cart total |
| `CONVENTIONS.md` | Rules every new test must follow |
| `.testmuai/context.md` | Standing context Kane CLI reads on every run |

## Run

```bash
npm install
npx playwright install chromium
npx playwright test
```

The `demo-solution` branch contains the finished "compare products" test as a backup.
