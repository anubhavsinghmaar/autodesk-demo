const { test, expect } = require('../fixtures/test-base');

test.describe('Cart total', () => {
  test('cart shows a grand total after adding a product', async ({ homePage, productPage, cartPage }) => {
    await homePage.search('HTC');
    await homePage.openProduct('HTC Touch HD');
    await productPage.addToCart();

    await cartPage.open();
    await expect(cartPage.itemNames()).toContainText(['HTC Touch HD']);
    await expect(cartPage.total()).toHaveText(/\$\d/);
  });
});
