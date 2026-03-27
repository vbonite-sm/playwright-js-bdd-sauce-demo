const BasePage = require('./BasePage');
const { createCartLocators } = require('./locators/CartLocators');

/**
 * @typedef {Object} CartItemDetails
 * @property {string} name
 * @property {string} description
 */

class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance scoped to the current browser context
   */
  constructor(page) {
    super(page);
    this.locators = createCartLocators(page);
  }

  /**
   * Returns the number of `[data-test="inventory-item"]` elements present in the cart list.
   * @returns {Promise<number>} Count of cart line items; 0 if the cart is empty
   */
  async getItemCount() {
    try {
      return await this.locators.cartItems.count();
    } catch (err) {
      throw new Error(`CartPage.getItemCount failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Reads the name and description of the first `[data-test="inventory-item"]` in the cart.
   * Both values are trimmed of surrounding whitespace.
    * @returns {Promise<CartItemDetails>} Display name and short description of the first cart item
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
   * Checks whether the Remove button (`role=button, name=/remove/i`) is enabled and interactable.
   * @returns {Promise<boolean>} `true` if the button is enabled, `false` if disabled
   */
  async isRemoveEnabled() {
    try {
      return await this.waitAndCheckEnabled(this.locators.removeButton);
    } catch (err) {
      throw new Error(`CartPage.isRemoveEnabled failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Checks whether the `[data-test="checkout"]` button is enabled and interactable.
   * @returns {Promise<boolean>} `true` if the button is enabled, `false` if disabled
   */
  async isCheckoutEnabled() {
    try {
      return await this.waitAndCheckEnabled(this.locators.checkoutButton);
    } catch (err) {
      throw new Error(`CartPage.isCheckoutEnabled failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Checks whether the `[data-test="continue-shopping"]` button is enabled and interactable.
   * @returns {Promise<boolean>} `true` if the button is enabled, `false` if disabled
   */
  async isContinueShoppingEnabled() {
    try {
      return await this.waitAndCheckEnabled(this.locators.continueShoppingButton);
    } catch (err) {
      throw new Error(`CartPage.isContinueShoppingEnabled failed: ${err.message}`, { cause: err });
    }
  }

  /**
   * Clicks the Remove button (`role=button, name=/remove/i`) to remove the first cart item.
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
   * Returns the count of `[data-test="shopping-cart-badge"]` elements in the header.
   * Saucedemo removes the badge from the DOM entirely when the cart is empty rather than
   * displaying "0", so `.count()` is used instead of `.textContent()` to avoid a locator error.
   * @returns {Promise<number>} Number shown on the cart badge, or 0 when the cart is empty
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
