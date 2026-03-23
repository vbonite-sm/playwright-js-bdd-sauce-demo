const BasePage = require('./BasePage');
const { createCartLocators } = require('./locators/CartLocators');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = createCartLocators(page);
  }

  async getItemCount() {
    try {
      return await this.locators.cartItems.count();
    } catch (err) {
      throw new Error(`CartPage.getItemCount failed: ${err.message}`, { cause: err });
    }
  }

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

  async isRemoveEnabled() {
    try {
      return await this.waitAndCheckEnabled(this.locators.removeButton);
    } catch (err) {
      throw new Error(`CartPage.isRemoveEnabled failed: ${err.message}`, { cause: err });
    }
  }

  async isCheckoutEnabled() {
    try {
      return await this.waitAndCheckEnabled(this.locators.checkoutButton);
    } catch (err) {
      throw new Error(`CartPage.isCheckoutEnabled failed: ${err.message}`, { cause: err });
    }
  }

  async isContinueShoppingEnabled() {
    try {
      return await this.waitAndCheckEnabled(this.locators.continueShoppingButton);
    } catch (err) {
      throw new Error(`CartPage.isContinueShoppingEnabled failed: ${err.message}`, { cause: err });
    }
  }

  async removeItem() {
    try {
      await this.locators.removeButton.click();
    } catch (err) {
      throw new Error(`CartPage.removeItem failed: ${err.message}`, { cause: err });
    }
  }

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
