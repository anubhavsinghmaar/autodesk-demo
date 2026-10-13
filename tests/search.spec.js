const { test, expect } = require('../fixtures/test-base');

test.describe('Catalogue search', () => {
  test('search returns matching products', async ({ homePage }) => {
    await homePage.search('iPhone');
    await expect(homePage.results().first()).toHaveText('iPhone');
  });
});
