const { Toast } = require('../components/Toast');

/** Shared behaviour for every page object. */
class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.toast = new Toast(page);
  }

  /** Open an OpenCart route, e.g. 'checkout/cart'. baseURL comes from config/environments.js. */
  async gotoRoute(route, params = {}) {
    const query = new URLSearchParams({ route, ...params }).toString();
    await this.page.goto(`?${query}`);
  }

  heading() {
    return this.page.locator('h1').first();
  }
}

module.exports = { BasePage };
