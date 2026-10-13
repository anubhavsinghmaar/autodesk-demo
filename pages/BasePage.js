/** Shared behaviour for every page object. */
class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  /** Open an OpenCart route, e.g. 'product/compare'. */
  async gotoRoute(route, params = {}) {
    const query = new URLSearchParams({ route, ...params }).toString();
    await this.page.goto(`?${query}`);
  }

  /** Visible success toast shown after cart / compare actions. */
  toast() {
    return this.page.locator('#notification-box-top');
  }
}

module.exports = { BasePage };
