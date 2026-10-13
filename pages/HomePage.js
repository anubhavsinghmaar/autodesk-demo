const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  async open() {
    await this.gotoRoute('common/home');
  }

  /** Search the catalogue. Continue with SearchResultsPage. */
  async search(term) {
    await this.gotoRoute('product/search', { search: term });
  }
}

module.exports = { HomePage };
