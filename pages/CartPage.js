const BasePage = require('./BasePage');
const { createCartLocators } = require('./locators/CartLocators');

class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = createCartLocators(page);
  }

  /**
   * Gets the number of items in the cart.
   * @returns {Promise<number>}
   */
  async getItemCount() {
    try {
      return await this.locators.cartItems.count();
    } catch (err) {
      throw new Error(`CartPage.getItemCount failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Gets the details of the first item in the cart.
   * @returns {Promise<{name: string, description: string}>}
   */
  async getItemDetails() {
    try {
      const item = this.locators.cartItems.first();
      const name = await item.getByTestId('inventory-item-name').textContent();
      const description = await item.getByTestId('inventory-item-desc').textContent();
      return { name: name.trim(), description: description.trim() };
    } catch (err) {
      throw new Error(`CartPage.getItemDetails failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Checks if the remove button is enabled.
   * @returns {Promise<boolean>}
   */
  async isRemoveEnabled() {
    try {
      return await this.waitAndCheckEnabled(this.locators.removeButton);
    } catch (err) {
      throw new Error(`CartPage.isRemoveEnabled failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Checks if the checkout button is enabled.
   * @returns {Promise<boolean>}
   */
  async isCheckoutEnabled() {
    try {
      return await this.waitAndCheckEnabled(this.locators.checkoutButton);
    } catch (err) {
      throw new Error(`CartPage.isCheckoutEnabled failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Checks if the continue shopping button is enabled.
   * @returns {Promise<boolean>}
   */
  async isContinueShoppingEnabled() {
    try {
      return await this.waitAndCheckEnabled(this.locators.continueShoppingButton);
    } catch (err) {
      throw new Error(`CartPage.isContinueShoppingEnabled failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Removes the first item from the cart.
   * @returns {Promise<void>}
   */
  async removeItem() {
    try {
      await this.locators.removeButton.click();
    } catch (err) {
      throw new Error(`CartPage.removeItem failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Gets the cart badge count. Returns 0 when the cart is empty (badge removed from DOM).
   * @returns {Promise<number>}
   */
  async getCartBadgeCount() {
    try {
      // When cart is empty, saucedemo removes badge from DOM entirely (not "0")
      // .count() returns 0 when no elements match — no error thrown
      return await this.locators.cartBadge.count();
    } catch (err) {
      throw new Error(`CartPage.getCartBadgeCount failed: ${err.message}`, { cause: err });
    }
  }
}

module.exports = CartPage;
