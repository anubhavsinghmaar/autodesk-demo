const { BasePage } = require('./BasePage');

class ComparePage extends BasePage {
  async open() {
    await this.gotoRoute('product/compare');
  }

  productNames() {
    return this.page.locator('#content table strong').filter({ hasNotText: 'Product Details' });
  }

  /** Add a compared product to the cart; buttons follow the column order. */
  async addToCart(name) {
    const names = await this.productNames().allInnerTexts();
    const index = names.indexOf(name);
    if (index === -1) throw new Error(`${name} is not in the comparison`);
    await this.page.locator('#content input[value="Add to Cart"]').nth(index).click();
    await this.toast.waitForSuccess('Success: You have added');
  }
}

module.exports = { ComparePage };
