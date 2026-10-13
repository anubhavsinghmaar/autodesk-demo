# Test framework conventions

Every new test must follow these rules. Reviewers reject tests that don't.

1. **Use page objects.** UI interaction lives in `pages/`. Tests never use raw locators.
2. **Reuse before you add.** Check `pages/` for an existing method first. Add a new page object only for a page that has none, and extend `BasePage`.
3. **Import from the fixture.** `const { test, expect } = require('../fixtures/test-base')`, never from `@playwright/test`. Register every new page object in `fixtures/test-base.js`.
4. **Navigate through `gotoRoute`.** No hard-coded full URLs; `baseURL` comes from `playwright.config.js`.
5. **One user journey per spec file** in `tests/`, named `<feature>.spec.js`, wrapped in `test.describe('<Feature>')`.
6. **Assert with web-first assertions** (`toHaveText`, `toBeVisible`). No fixed sleeps.
