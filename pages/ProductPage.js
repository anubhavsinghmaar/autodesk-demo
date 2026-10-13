const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  title() {
    return this.page.locator('h1').first();
  }

  async addToCart() {
    await this.page.getByRole('button', { name: 'Add to Cart' }).filter({ visible: true }).first().click();
    await this.toast().getByText('Success: You have added').waitFor();
  }

  async addToCompare() {
    await this.page.getByRole('button', { name: 'Compare this Product' }).filter({ visible: true }).first().click();
    await this.toast().getByText('to your product comparison').waitFor();
  }
}

module.exports = { ProductPage };
