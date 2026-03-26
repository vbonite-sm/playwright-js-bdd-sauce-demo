/**
 * @param {import('@playwright/test').Page} page
 */
function createProductsLocators(page) {
  return {
    inventoryList: page.getByTestId('inventory-list'),
    cartBadge: page.getByTestId('shopping-cart-badge'),
    cartLink: page.getByTestId('shopping-cart-link'),
    inventoryItem: page.locator('[data-test="inventory-item"]'),
    addToCartButton: page.locator('[data-test^="add-to-cart"]'),
  };
}
module.exports = { createProductsLocators };
