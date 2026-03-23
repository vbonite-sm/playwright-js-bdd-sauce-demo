const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const logger = require('../support/logger');

// qty=1: checked from products page after adding — uses productsPage.getCartQuantity()
// qty=0: checked after removal — badge is removed from DOM by saucedemo, uses cartPage.getCartBadgeCount()
Then('the cart quantity should be {int}', async function (expectedQty) {
  logger.debug(`step: the cart quantity should be ${expectedQty}`);
  if (expectedQty === 0) {
    const count = await this.cartPage.getCartBadgeCount();
    expect(count).toBe(0);
  } else {
    const qty = await this.productsPage.getCartQuantity();
    expect(Number.parseInt(qty)).toBe(expectedQty);
  }
});

Then('the cart should contain {int} item with correct name and description', async function (count) {
  logger.debug(`step: the cart should contain ${count} item with correct name and description`);
  if (!this.collectedProducts.length) throw new Error('Products were not collected — run the collect products step first');
  const itemCount = await this.cartPage.getItemCount();
  expect(itemCount).toBe(count);
  const details = await this.cartPage.getItemDetails();
  expect(details.name).toBe(this.collectedProducts[0].name);
  expect(details.description).toBe(this.collectedProducts[0].description);
});

Then('the Remove button should be enabled', async function () {
  logger.debug('step: the Remove button should be enabled');
  expect(await this.cartPage.isRemoveEnabled()).toBe(true);
});

Then('the Checkout button should be enabled', async function () {
  logger.debug('step: the Checkout button should be enabled');
  expect(await this.cartPage.isCheckoutEnabled()).toBe(true);
});

Then('the Continue Shopping button should be enabled', async function () {
  logger.debug('step: the Continue Shopping button should be enabled');
  expect(await this.cartPage.isContinueShoppingEnabled()).toBe(true);
});

When('I remove the product from the cart', async function () {
  logger.debug('step: I remove the product from the cart');
  await this.cartPage.removeItem();
});
