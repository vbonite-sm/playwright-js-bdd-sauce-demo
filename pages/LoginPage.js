const BasePage = require('./BasePage');
const { baseUrl } = require('../test-data/credentials.json');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
  }

  async navigate() {
    await this.page.goto(baseUrl);
  }

  async enterCredentials(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
