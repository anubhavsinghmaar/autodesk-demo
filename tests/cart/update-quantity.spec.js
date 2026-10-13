const { test, expect } = require('../../fixtures/test-base');

test.describe('Cart quantity', { tag: '@cart' }, () => {
  test('quantity can be updated in the cart', { tag: '@regression' }, async ({ cartWithIphone }) => {
    await cartWithIphone.setQuantity(2);
    await expect(cartWithIphone.quantityInput()).toHaveValue('2');
  });
});
