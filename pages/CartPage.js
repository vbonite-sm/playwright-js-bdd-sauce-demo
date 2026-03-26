const BasePage = require('./BasePage');
const { createCartLocators } = require('./locators/CartLocators');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = createCartLocators(page);
  }

  async getItemCount() {
    return await this.locators.cartItems.count();
  }

  async getItemDetails() {
    const item = this.locators.cartItems.first();
    const name = await item.getByTestId('inventory-item-name').textContent();
    const description = await item.getByTestId('inventory-item-desc').textContent();
    return { name: name.trim(), description: description.trim() };
  }

  async isRemoveEnabled() {
    return await this.locators.removeButton.isEnabled();
  }

  async isCheckoutEnabled() {
    return await this.locators.checkoutButton.isEnabled();
  }

  async isContinueShoppingEnabled() {
    return await this.locators.continueShoppingButton.isEnabled();
  }

  async removeItem() {
    await this.locators.removeButton.click();
  }

  async getCartBadgeCount() {
    // When cart is empty, saucedemo removes badge from DOM entirely (not "0")
    // .count() returns 0 when no elements match — no error thrown
    return await this.locators.cartBadge.count();
  }
}

module.exports = CartPage;
