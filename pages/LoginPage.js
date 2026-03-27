const BasePage = require('./BasePage');
const { createLoginLocators } = require('./locators/LoginLocators');
const { baseUrl } = require('../test-data/config.json');
const logger = require('../support/logger');

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = createLoginLocators(page);
  }

  /**
   * Navigates to the login page.
   * @returns {Promise<void>}
   */
  async navigate() {
    try {
      logger.info('LoginPage.navigate: navigating to ' + baseUrl);
      await this.page.goto(baseUrl);
    } catch (err) {
      logger.error('LoginPage.navigate failed: ' + err.message);
      throw new Error(`LoginPage.navigate failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Fills the username and password fields.
   * @param {string} username
   * @param {string} password
   * @returns {Promise<void>}
   */
  async enterCredentials(username, password) {
    try {
      logger.info('LoginPage.enterCredentials: entering credentials for ' + username);
      await this.locators.usernameInput.fill(username);
      await this.locators.passwordInput.fill(password);
    } catch (err) {
      logger.error('LoginPage.enterCredentials failed: ' + err.message);
      throw new Error(`LoginPage.enterCredentials failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Clicks the login button.
   * @returns {Promise<void>}
   */
  async clickLogin() {
    try {
      logger.info('LoginPage.clickLogin: clicking login button');
      await this.locators.loginButton.click();
    } catch (err) {
      logger.error('LoginPage.clickLogin failed: ' + err.message);
      throw new Error(`LoginPage.clickLogin failed: ${err.message}`, { cause: err });
    }
  }
}

module.exports = LoginPage;
