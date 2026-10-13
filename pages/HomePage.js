const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  async open() {
    await this.gotoRoute('common/home');
  }

  /** Search the catalogue and land on the results page. */
  async search(term) {
    await this.gotoRoute('product/search', { search: term });
  }

  results() {
    return this.page.locator('.product-thumb .caption h4 a').filter({ visible: true });
  }

  /** Open a product from the results by its exact name. */
  async openProduct(name) {
    await this.results().getByText(name, { exact: true }).first().click();
    await this.page.waitForURL(/product_id=/);
  }
}

module.exports = { HomePage };
