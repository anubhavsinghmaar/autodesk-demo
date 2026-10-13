const { test, expect } = require('../../fixtures/test-base');

test.describe('Remove from cart', { tag: '@cart' }, () => {
  test('removing the only item empties the cart', { tag: '@regression' }, async ({ cartWithIphone }) => {
    await cartWithIphone.removeItem();
    await expect(cartWithIphone.emptyMessage()).toBeVisible();
  });
});
