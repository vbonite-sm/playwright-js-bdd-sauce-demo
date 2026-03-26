const BasePage = require('./BasePage');
const { createLoginLocators } = require('./locators/LoginLocators');
const { baseUrl } = require('../test-data/config.json');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = createLoginLocators(page);
  }

  async navigate() {
    await this.page.goto(baseUrl);
  }

  async enterCredentials(username, password) {
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.locators.loginButton.click();
  }
}

module.exports = LoginPage;
