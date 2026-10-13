const { test, expect } = require('../../fixtures/test-base');

test.describe('Cart total', { tag: '@cart' }, () => {
  test('cart shows a grand total in the store currency', { tag: '@regression' }, async ({ cartWithIphone }) => {
    await expect(cartWithIphone.total()).toBePrice();
  });
});
