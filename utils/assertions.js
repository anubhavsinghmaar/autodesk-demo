// Team custom matchers. Registered once in fixtures/test-base.js.
const { env } = require('../config/environments');

const customMatchers = {
  /** Passes when the locator's text is a price in the environment currency, e.g. "$123.20". */
  async toBePrice(locator) {
    const text = (await locator.innerText()).trim();
    const pattern = new RegExp(`^\\${env.currency}[\\d,]+\\.\\d{2}`);
    const pass = pattern.test(text);
    return {
      pass,
      message: () => `expected "${text}" ${pass ? 'not ' : ''}to be a price in ${env.currency}`,
    };
  },
};

module.exports = { customMatchers };
