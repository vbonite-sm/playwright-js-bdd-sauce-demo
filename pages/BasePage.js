class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async waitAndCheckVisible(locator, options = {}) {
    try {
      await locator.waitFor({ state: 'visible', ...options });
      return true;
    } catch {
      return false;
    }
  }

  async waitAndCheckEnabled(locator, options = {}) {
    try {
      await locator.waitFor({ state: 'visible', ...options });
      return await locator.isEnabled();
    } catch {
      return false;
    }
  }

  async waitAndCheckHidden(locator, options = {}) {
    try {
      await locator.waitFor({ state: 'hidden', ...options });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = BasePage;
