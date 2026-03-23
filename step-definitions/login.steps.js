const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const credentials = require('../test-data/credentials.json');

Given('I open the saucedemo website', async function () {
  await this.loginPage.navigate();
});

When('I enter valid credentials', async function () {
  await this.loginPage.enterCredentials(credentials.username, credentials.password);
});

When('I enter credentials {string} and {string}', async function (username, password) {
  await this.loginPage.enterCredentials(username, password);
});

When('I click the login button', async function () {
  await this.loginPage.clickLogin();
});

Then('I should see the products page', async function () {
  await expect(this.productsPage.inventoryList).toBeVisible();
});
