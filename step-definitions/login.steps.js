const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const credentials = require('../test-data/credentials.json');
const logger = require('../support/logger');

Given('I open the saucedemo website', async function () {
  logger.debug('step: I open the saucedemo website');
  await this.loginPage.navigate();
});

When('I login as {string}', async function (username) {
  logger.debug(`step: I login as "${username}"`);
  const user = credentials.validUsers.find(u => u.username === username);
  if (!user) throw new Error(`User "${username}" not found in credentials.json validUsers`);
  await this.loginPage.enterCredentials(user.username, user.password);
});

When('I click the login button', async function () {
  logger.debug('step: I click the login button');
  await this.loginPage.clickLogin();
});

Then('I should see the products page', async function () {
  logger.debug('step: I should see the products page');
  await expect(this.productsPage.locators.inventoryList).toBeVisible();
});
