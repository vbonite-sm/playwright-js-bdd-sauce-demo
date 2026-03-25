const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const credentials = require('../test-data/credentials.json');

Given('I open the saucedemo website', async function () {
  await this.loginPage.navigate();
});

When('I enter valid credentials', async function () {
  await this.loginPage.enterCredentials(credentials.username, credentials.password);
});

When('I click the login button', async function () {
  await this.loginPage.clickLogin();
});

Then('I should see the products page', async function () {
  // inventoryList is a Playwright Locator — expect() works directly on it
  await expect(this.productsPage.inventoryList).toBeVisible();
});

When('I collect all products with their name and price', async function () {
  this.collectedProducts = await this.productsPage.getAllProducts();
});

Then('the products list should not be empty', async function () {
  expect(this.collectedProducts.length).toBeGreaterThan(0);
});

When('I add the first product to the cart', async function () {
  await this.productsPage.addFirstProductToCart();
});

// qty=1: called from products page after adding item — uses productsPage.getCartQuantity()
// qty=0: called from cart page after removal — uses cartPage.getCartBadgeCount()
// saucedemo removes badge from DOM when cart is empty (does not show "0")
Then('the cart quantity should be {int}', async function (expectedQty) {
  if (expectedQty === 0) {
    const count = await this.cartPage.getCartBadgeCount();
    expect(count).toBe(0);
  } else {
    const qty = await this.productsPage.getCartQuantity();
    expect(Number.parseInt(qty)).toBe(expectedQty);
  }
});

When('I navigate to the cart page', async function () {
  await this.productsPage.goToCart();
});

Then('the cart should contain {int} item with correct name and description', async function (count) {
  const itemCount = await this.cartPage.getItemCount();
  expect(itemCount).toBe(count);
  const details = await this.cartPage.getItemDetails();
  // collectedProducts[0] is the first product added — compare name against cart
  expect(details.name).toBe(this.collectedProducts[0].name);
  expect(details.description).toBeTruthy();
});

Then('the Remove button should be enabled', async function () {
  expect(await this.cartPage.isRemoveEnabled()).toBe(true);
});

Then('the Checkout button should be enabled', async function () {
  expect(await this.cartPage.isCheckoutEnabled()).toBe(true);
});

Then('the Continue Shopping button should be enabled', async function () {
  expect(await this.cartPage.isContinueShoppingEnabled()).toBe(true);
});

When('I remove the product from the cart', async function () {
  await this.cartPage.removeItem();
});
