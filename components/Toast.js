/** The notification toast shown after cart and compare actions. Shared by all page objects. */
class Toast {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.root = page.locator('#notification-box-top');
  }

  async waitForSuccess(text = 'Success') {
    await this.root.getByText(text).first().waitFor();
  }
}

module.exports = { Toast };
