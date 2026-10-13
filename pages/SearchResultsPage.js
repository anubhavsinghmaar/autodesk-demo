const { BasePage } = require('./BasePage');

class SearchResultsPage extends BasePage {
  productNames() {
    return this.page.locator('.product-thumb .caption h4 a').filter({ visible: true });
  }

  productPrices() {
    return this.page.locator('.product-thumb .price').filter({ visible: true });
  }

  emptyMessage() {
    return this.page.getByText('There is no product that matches the search criteria.');
  }

  /** Open a product by its exact name and wait for the product page. */
  async openProduct(name) {
    await this.productNames().getByText(name, { exact: true }).first().click();
    await this.page.waitForURL(/product_id=/);
  }
}

module.exports = { SearchResultsPage };
