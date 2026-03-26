const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const logger = require('../support/logger');

When('I collect all products with their name and price', async function () {
  logger.debug('step: I collect all products with their name and price');
  this.collectedProducts = await this.productsPage.getAllProducts();
});

Then('the products list should not be empty', async function () {
  logger.debug('step: the products list should not be empty');
  expect(this.collectedProducts.length).toBeGreaterThan(0);
});

When('I add the first product to the cart', async function () {
  logger.debug('step: I add the first product to the cart');
  await this.productsPage.addFirstProductToCart();
});

When('I navigate to the cart page', async function () {
  logger.debug('step: I navigate to the cart page');
  await this.productsPage.goToCart();
});
