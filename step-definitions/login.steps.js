const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const credentials = require('../test-data/credentials.json');

Given('I open the saucedemo website', async function () {
  await this.loginPage.navigate();
});

When('I enter valid credentials', async function () {
  await this.loginPage.enterCredentials(credentials.username, credentials.password);
});

When('I login as {string}', async function (username) {
  const user = credentials.validUsers.find(u => u.username === username);
  if (!user) throw new Error(`User "${username}" not found in credentials.json validUsers`);
  await this.loginPage.enterCredentials(user.username, user.password);
});

When('I click the login button', async function () {
  await this.loginPage.clickLogin();
});

Then('I should see the products page', async function () {
  await expect(this.productsPage.inventoryList).toBeVisible();
});
