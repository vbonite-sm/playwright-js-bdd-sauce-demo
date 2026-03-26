const BasePage = require('./BasePage');
const { createLoginLocators } = require('./locators/LoginLocators');
const { baseUrl } = require('../test-data/config.json');

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
      await this.page.goto(baseUrl);
    } catch (err) {
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
      await this.locators.usernameInput.fill(username);
      await this.locators.passwordInput.fill(password);
    } catch (err) {
      throw new Error(`LoginPage.enterCredentials failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Clicks the login button.
   * @returns {Promise<void>}
   */
  async clickLogin() {
    try {
      await this.locators.loginButton.click();
    } catch (err) {
      throw new Error(`LoginPage.clickLogin failed: ${err.message}`, { cause: err });
    }
  }
}

module.exports = LoginPage;
