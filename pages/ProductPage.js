const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  title() {
    return this.heading();
  }

  async addToCart() {
    await this.page.getByRole('button', { name: 'Add to Cart' }).filter({ visible: true }).first().click();
    await this.toast.waitForSuccess('Success: You have added');
  }
}

module.exports = { ProductPage };
