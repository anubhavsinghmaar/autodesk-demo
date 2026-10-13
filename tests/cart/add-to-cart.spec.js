const { test, expect } = require('../../fixtures/test-base');

test.describe('Add to cart', { tag: '@cart' }, () => {
  test('a searched product can be added to the cart', { tag: '@smoke' }, async ({ homePage, searchResults, productPage, cartPage, products }) => {
    await homePage.search(products.iphone.searchTerm);
    await searchResults.openProduct(products.iphone.name);
    await expect(productPage.title()).toHaveText(products.iphone.name);
    await productPage.addToCart();

    await cartPage.open();
    await expect(cartPage.itemNames()).toHaveText([products.iphone.name]);
  });
});
