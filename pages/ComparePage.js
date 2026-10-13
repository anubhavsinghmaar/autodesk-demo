const { BasePage } = require('./BasePage');

class ComparePage extends BasePage {
  async open() {
    await this.gotoRoute('product/compare');
  }

  heading() {
    return this.page.locator('h1').first();
  }

  /** Product names, one per comparison column, in column order. */
  productNames() {
    return this.page.locator('#content table tr', { has: this.page.getByRole('cell', { name: 'Product', exact: true }) }).getByRole('link');
  }

  /** Click Add to Cart in the column of the named product. */
  async addToCart(name) {
    const index = (await this.productNames().allInnerTexts()).indexOf(name);
    if (index === -1) throw new Error(`"${name}" is not on the comparison page`);
    await this.page.getByRole('button', { name: 'Add to Cart' }).filter({ visible: true }).nth(index).click();
    await this.toast().getByText('Success: You have added').waitFor();
  }
}

module.exports = { ComparePage };
