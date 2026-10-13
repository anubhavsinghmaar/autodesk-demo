const { test, expect } = require('../fixtures/test-base');

test.describe('Product comparison', () => {
  test('compared products can be added to the cart from the comparison page', async ({ homePage, productPage, comparePage, cartPage }) => {
    await homePage.search('iPhone');
    await homePage.openProduct('iPhone');
    await productPage.addToCompare();

    await homePage.search('HTC');
    await homePage.openProduct('HTC Touch HD');
    await productPage.addToCompare();

    await comparePage.open();
    await expect(comparePage.heading()).toHaveText('Product Comparison');
    await expect(comparePage.productNames()).toHaveText(['iPhone', 'HTC Touch HD']);
    await comparePage.addToCart('iPhone');

    await cartPage.open();
    await expect(cartPage.itemNames()).toHaveText(['iPhone']);
  });
});
