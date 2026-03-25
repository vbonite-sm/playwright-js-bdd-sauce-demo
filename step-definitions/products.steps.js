const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I collect all products with their name and price', async function () {
  this.collectedProducts = await this.productsPage.getAllProducts();
});

Then('the products list should not be empty', async function () {
  expect(this.collectedProducts.length).toBeGreaterThan(0);
});

When('I add the first product to the cart', async function () {
  await this.productsPage.addFirstProductToCart();
});

When('I navigate to the cart page', async function () {
  await this.productsPage.goToCart();
});
