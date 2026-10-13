const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  async open() {
    await this.gotoRoute('checkout/cart');
  }

  itemNames() {
    return this.page.locator('#content table tbody td.text-left a');
  }

  /** Grand total shown in the cart totals table. */
  total() {
    return this.page.locator('#content table').last().locator('tr').last().locator('td').last();
  }
}

module.exports = { CartPage };
