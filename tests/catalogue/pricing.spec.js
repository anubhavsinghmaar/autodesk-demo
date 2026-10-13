const { test, expect } = require('../../fixtures/test-base');

test.describe('Catalogue pricing', { tag: '@catalogue' }, () => {
  test('search results show prices in the store currency', { tag: '@regression' }, async ({ homePage, searchResults, products }) => {
    await homePage.search(products.iphone.searchTerm);
    await expect(searchResults.productPrices().first()).toBePrice();
  });
});
