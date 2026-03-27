class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Waits for the locator to become visible.
   * @param {import('@playwright/test').Locator} locator
    * @param {import('@playwright/test').LocatorWaitForOptions} [options]
   * @returns {Promise<boolean>}
   */
  async waitAndCheckVisible(locator, options = {}) {
    try {
      await locator.waitFor({ state: 'visible', ...options });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Waits for the locator to become visible and checks if it is enabled.
   * @param {import('@playwright/test').Locator} locator
    * @param {import('@playwright/test').LocatorWaitForOptions} [options]
   * @returns {Promise<boolean>}
   */
  async waitAndCheckEnabled(locator, options = {}) {
    try {
      await locator.waitFor({ state: 'visible', ...options });
      return await locator.isEnabled();
    } catch {
      return false;
    }
  }

  /**
   * Waits for the locator to become hidden.
   * @param {import('@playwright/test').Locator} locator
    * @param {import('@playwright/test').LocatorWaitForOptions} [options]
   * @returns {Promise<boolean>}
   */
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
