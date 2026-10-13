const { test, expect } = require('../../fixtures/test-base');

test.describe('Catalogue search', { tag: '@catalogue' }, () => {
  test('returns matching products', { tag: '@smoke' }, async ({ homePage, searchResults, products }) => {
    await homePage.search(products.iphone.searchTerm);
    await expect(searchResults.productNames().first()).toHaveText(products.iphone.name);
  });

  test('shows a message when nothing matches', { tag: '@regression' }, async ({ homePage, searchResults, products }) => {
    await homePage.search(products.unknown.searchTerm);
    await expect(searchResults.emptyMessage()).toBeVisible();
  });
});
