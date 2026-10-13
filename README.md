# autodesk-demo

A team-style Playwright (JavaScript) framework used to show one idea:

> **New tests should extend your existing framework, not replace it.**
> Your coding agent (Claude Code or Cursor) understands your code. **Kane CLI** proves the user journey works in a real browser. Together they produce a new test written in your framework's style, and you run it with your own Playwright setup.

---

## 1. The workflow at a glance

```mermaid
flowchart LR
    A["You describe a new test<br/>in plain English"] --> B["Claude Code reads<br/>your framework<br/>(pages, fixtures, conventions)"]
    B --> C["Kane CLI runs the journey<br/>in a real browser<br/>and verifies it passes"]
    C --> D["Kane CLI exports<br/>verified Playwright JS<br/>(intent per step, standalone)"]
    D --> E["Claude Code rewrites it<br/>into your framework:<br/>reuses page objects,<br/>adds only what is new"]
    E --> F["npx playwright test<br/>runs in YOUR runner and CI<br/>(nothing replaced)"]

    style C fill:#E8F6EE,stroke:#15803D
    style D fill:#E8F6EE,stroke:#15803D
    style B fill:#EEF2FF,stroke:#4F46E5
    style E fill:#EEF2FF,stroke:#4F46E5
    style F fill:#FFF7ED,stroke:#C2410C
```

| Colour | Who does it |
|---|---|
| Purple | Your coding agent (Claude Code / Cursor): understands and edits your code |
| Green | Kane CLI: runs and verifies the journey in a real browser, exports code |
| Orange | Your existing infrastructure: runner, CI, dashboards, unchanged |

---

## 2. What each step proves in the demo

```mermaid
flowchart TD
    subgraph A["Flow A · Kane CLI on its own"]
        A1["Plain-English objective<br/>'search iPhone, add to cart, verify cart'"] --> A2["Real browser run + verdict + evidence"]
        A2 --> A3["Exported test.js<br/>intent per step + auto-heal bindings,<br/>but standalone: no page objects"]
    end

    subgraph B["Flow B · Kane CLI + Claude Code"]
        B1["Prompt: add a 'compare products' test<br/>in our framework style"] --> B2["Claude reads CONVENTIONS.md,<br/>pages/, fixtures/"]
        B2 --> B3["Kane CLI verifies the compare journey<br/>in a real browser"]
        B3 --> B4["Claude writes the test:<br/>reuses HomePage, SearchResultsPage,<br/>ProductPage, CartPage, test data<br/>adds ComparePage + addToCompare()"]
        B4 --> B5["npm test: 8 passed"]
    end

    A3 -. "the gap: generic code<br/>would fail your code review" .-> B1
```

---

## 3. How the framework is layered

New tests are expected to plug into these layers. The demo shows the agent reusing them instead of writing raw Playwright.

```mermaid
flowchart BT
    CFG["config/environments.js<br/>baseURL + currency per TEST_ENV"]
    DATA["data/products.js<br/>shared test data"]
    CMP["components/Toast.js<br/>UI shared across pages"]
    PAGES["pages/<br/>BasePage → HomePage, SearchResultsPage,<br/>ProductPage, CartPage"]
    UTIL["utils/assertions.js<br/>custom matcher toBePrice()"]
    FIX["fixtures/test-base.js<br/>page objects + test data + journey fixture cartWithIphone"]
    TESTS["tests/catalogue · tests/cart<br/>specs use fixtures only, no raw locators"]

    CFG --> PAGES
    CMP --> PAGES
    PAGES --> FIX
    DATA --> FIX
    UTIL --> FIX
    FIX --> TESTS
```

| Folder | Holds | Rule |
|---|---|---|
| `config/` | Environments | Never hard-code URLs |
| `data/` | Test data | Reference by key, e.g. `products.iphone` |
| `components/` | Shared UI | Used by page objects, never by tests |
| `pages/` | Page objects | All locators live here; extend `BasePage` |
| `utils/` | Custom matchers | e.g. `toBePrice()` |
| `fixtures/` | Test fixture | Import `test` and `expect` from here |
| `tests/` | Specs by area | One journey per file, tagged `@smoke` / `@regression` |

Full rules: [CONVENTIONS.md](CONVENTIONS.md).

---

## 4. Before and after (the point of the demo)

**Kane CLI export (Flow A, real excerpt from `test.js`):** verified and runnable. Every step carries its plain-English intent, and the TestMu AI Playwright bindings add auto-heal (`autoHealVersion: "AH2"`). But it is standalone code, not written in your framework.

```js
import testmu from '@testmuai/playwright-bindings';

testmu.configure({ name: "Add iPhone to Cart and Verify", autoHealVersion: "AH2" /* ... */ });

testmu.test("Add iPhone to Cart and Verify", async (page) => {
  await testmu.step("Typing iPhone into product search input", { instructionId: "..." }, async () => {
    element_0 = page.locator('internal:role=textbox[name="Search For Products"i]');
    await element_0.fill("iPhone");
  });
  await testmu.step("Clicking Add to Cart button for iPhone purchase", { instructionId: "..." }, async () => {
    element_4 = page.locator('internal:role=button[name="Add to Cart"i]');
    await element_4.click();
  });
  // ...no page objects, no team fixture, no shared test data
});
```

**After Claude Code fits it into the framework (Flow B):**

```js
const { test, expect } = require('../../fixtures/test-base');

test('compare two products and add the chosen one to the cart', { tag: '@regression' },
  async ({ homePage, searchResults, productPage, comparePage, cartPage, products }) => {
    for (const product of [products.iphone, products.htc]) {
      await homePage.search(product.searchTerm);
      await searchResults.openProduct(product.name);
      await productPage.addToCompare();
    }
    await comparePage.open();
    await expect(comparePage.productNames()).toHaveText([products.iphone.name, products.htc.name]);
    await comparePage.addToCart(products.iphone.name);
    await cartPage.open();
    await expect(cartPage.itemNames()).toHaveText([products.iphone.name]);
});
```

Same verified journey. It now reuses the team's page objects, test data and fixture, and adds only one new page object.

---

## 5. Run it

```bash
npm install
npx playwright install chromium
npm test              # 7 tests on main
npm run test:smoke    # @smoke only
```

## Branches

| Branch | What it shows |
|---|---|
| `main` | The framework before the demo (7 tests) |
| `demo-solution` | After Flow B: the compare test in framework style (8 tests) |

The site under test is the public demo store https://ecommerce-playground.lambdatest.io.
