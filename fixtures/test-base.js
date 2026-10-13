// Team fixture. Import { test, expect } from here, never from @playwright/test.
const base = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { ComparePage } = require('../pages/ComparePage');
const { products } = require('../data/products');
const { customMatchers } = require('../utils/assertions');

const expect = base.expect.extend(customMatchers);

const test = base.test.extend({
  // Page objects
  homePage: async ({ page }, use) => use(new HomePage(page)),
  searchResults: async ({ page }, use) => use(new SearchResultsPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  comparePage: async ({ page }, use) => use(new ComparePage(page)),

  // Test data
  products: async ({}, use) => use(products),

  // Journey fixture: a cart that already holds the iPhone. Use it for any cart test.
  cartWithIphone: async ({ homePage, searchResults, productPage, cartPage }, use) => {
    await homePage.search(products.iphone.searchTerm);
    await searchResults.openProduct(products.iphone.name);
    await productPage.addToCart();
    await cartPage.open();
    await use(cartPage);
  },
});

module.exports = { test, expect };
