const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  async open() {
    await this.gotoRoute('checkout/cart');
  }

  itemNames() {
    return this.page.locator('#content table tbody td.text-left a');
  }

  quantityInput(index = 0) {
    return this.page.locator('input[name^="quantity"]').filter({ visible: true }).nth(index);
  }

  async setQuantity(quantity, index = 0) {
    await this.quantityInput(index).fill(String(quantity));
    await this.page.locator('button[title="Update"]').filter({ visible: true }).nth(index).click();
    await this.page.waitForLoadState();
  }

  async removeItem(index = 0) {
    await this.page.locator('button[title="Remove"]').filter({ visible: true }).nth(index).click();
  }

  emptyMessage() {
    return this.page.locator('#content').getByText('Your shopping cart is empty!');
  }

  /** Grand total: last row of the totals table. */
  total() {
    return this.page.locator('#content table').last().locator('tr').last().locator('td').last();
  }
}

module.exports = { CartPage };
