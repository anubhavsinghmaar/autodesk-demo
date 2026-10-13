// Team fixture: every test gets ready-made page objects. Import { test, expect } from here, never from @playwright/test.
const base = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { ComparePage } = require('../pages/ComparePage');

const test = base.test.extend({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  comparePage: async ({ page }, use) => use(new ComparePage(page)),
});

module.exports = { test, expect: base.expect };
