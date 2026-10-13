# autodesk-demo

A Playwright (JavaScript) team framework used to demo **Kane CLI + Claude Code**: authoring new tests that reuse and extend an existing framework instead of replacing it.

## Structure

```
config/environments.js     TEST_ENV-driven baseURL and currency
data/products.js           shared test data
components/Toast.js        UI shared across pages
pages/                     BasePage, HomePage, SearchResultsPage, ProductPage, CartPage
utils/assertions.js        custom matchers (toBePrice)
fixtures/test-base.js      page objects, test data, journey fixture (cartWithIphone)
tests/catalogue/           search, pricing
tests/cart/                add to cart, total, quantity, remove
CONVENTIONS.md             rules every new test must follow
.testmuai/context.md       standing context Kane CLI reads on every run
DEMO_SCRIPT.md             the call script
```

## Run

```bash
npm install
npx playwright install chromium
npm test              # all 7 tests
npm run test:smoke    # @smoke only
```

## Branches
- `main`: the framework before the demo (7 tests).
- `demo-solution`: the finished "compare products" test in framework style (8 tests). Backup if the live run fails.
