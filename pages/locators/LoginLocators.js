/**
 * @param {import('@playwright/test').Page} page
 */
function createLoginLocators(page) {
  return {
    usernameInput: page.getByTestId('username'),
    passwordInput: page.getByTestId('password'),
    loginButton: page.getByTestId('login-button'),
  };
}

module.exports = { createLoginLocators };
