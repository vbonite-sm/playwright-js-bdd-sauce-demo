const BasePage = require('./BasePage');
const { createLoginLocators } = require('./locators/LoginLocators');
const { baseUrl } = require('../test-data/config.json');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = createLoginLocators(page);
  }

  async navigate() {
    try {
      await this.page.goto(baseUrl);
    } catch (err) {
      throw new Error(`LoginPage.navigate failed: ${err.message}`, { cause: err });
    }
  }

  async enterCredentials(username, password) {
    try {
      await this.locators.usernameInput.fill(username);
      await this.locators.passwordInput.fill(password);
    } catch (err) {
      throw new Error(`LoginPage.enterCredentials failed: ${err.message}`, { cause: err });
    }
  }

  async clickLogin() {
    try {
      await this.locators.loginButton.click();
    } catch (err) {
      throw new Error(`LoginPage.clickLogin failed: ${err.message}`, { cause: err });
    }
  }
}

module.exports = LoginPage;
