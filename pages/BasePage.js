const logger = require('../support/logger');

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
      logger.debug('waitAndCheckVisible: waiting for visible state');
      await locator.waitFor({ state: 'visible', ...options });
      return true;
    } catch (err) {
      logger.error('waitAndCheckVisible failed: ' + err.message);
      return false;
    }
  }

  /**
   * Waits for the locator to become visible, then polls until it is enabled.
   * @param {import('@playwright/test').Locator} locator
    * @param {import('@playwright/test').LocatorWaitForOptions} [options]
   * @returns {Promise<boolean>}
   */
  async waitAndCheckEnabled(locator, options = {}) {
    const timeout = options.timeout ?? 30000;
    const pollInterval = 100;
    const deadline = Date.now() + timeout;

    try {
      logger.debug('waitAndCheckEnabled: waiting for visible state');
      await locator.waitFor({ state: 'visible', ...options });
      while (Date.now() < deadline) {
        if (await locator.isEnabled()) {
          logger.debug('waitAndCheckEnabled: element is enabled');
          return true;
        }
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }
      logger.error('waitAndCheckEnabled: element did not become enabled within timeout');
      return false;
    } catch (err) {
      logger.error('waitAndCheckEnabled failed: ' + err.message);
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
      logger.debug('waitAndCheckHidden: waiting for hidden state');
      await locator.waitFor({ state: 'hidden', ...options });
      return true;
    } catch (err) {
      logger.error('waitAndCheckHidden failed: ' + err.message);
      return false;
    }
  }
}

module.exports = BasePage;
