const { test, expect } = require('../fixtures/test-base');

test.describe('Add to cart', () => {
  test('a searched product can be added to the cart', async ({ homePage, productPage, cartPage }) => {
    await homePage.search('iPhone');
    await homePage.openProduct('iPhone');
    await expect(productPage.title()).toHaveText('iPhone');
    await productPage.addToCart();

    await cartPage.open();
    await expect(cartPage.itemNames()).toHaveText(['iPhone']);
  });
});
