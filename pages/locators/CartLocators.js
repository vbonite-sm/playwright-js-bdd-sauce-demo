/**
 * @param {import('@playwright/test').Page} page
 */
function createCartLocators(page) {
  return {
    cartItems: page.getByTestId('inventory-item'),
    removeButton: page.getByRole('button', { name: /remove/i }),
    checkoutButton: page.getByTestId('checkout'),
    continueShoppingButton: page.getByTestId('continue-shopping'),
    cartBadge: page.getByTestId('shopping-cart-badge'),
  };
}

module.exports = { createCartLocators };
