const { test, expect } = require('../../fixtures/test-base');

test.describe('Product comparison', { tag: '@compare' }, () => {
  test('compare two products and add the chosen one to the cart', { tag: '@regression' }, async ({ homePage, searchResults, productPage, comparePage, cartPage, products }) => {
    for (const product of [products.iphone, products.htc]) {
      await homePage.search(product.searchTerm);
      await searchResults.openProduct(product.name);
      await productPage.addToCompare();
    }

    await comparePage.open();
    await expect(comparePage.heading()).toHaveText('Product Comparison');
    await expect(comparePage.productNames()).toHaveText([products.iphone.name, products.htc.name]);

    await comparePage.addToCart(products.iphone.name);
    await cartPage.open();
    await expect(cartPage.itemNames()).toHaveText([products.iphone.name]);
  });
});
