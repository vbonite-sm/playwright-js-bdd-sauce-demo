class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.getByTestId('inventory-item');
    this.removeButton = page.getByRole('button', { name: /remove/i });
    this.checkoutButton = page.getByTestId('checkout');
    this.continueButton = page.getByTestId('continue-shopping');
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async getItemDetails() {
    const item = this.cartItems.first();
    const name = await item.getByTestId('inventory-item-name').textContent();
    const description = await item.getByTestId('inventory-item-desc').textContent();
    return { name: name.trim(), description: description.trim() };
  }

  async isRemoveEnabled() {
    return this.removeButton.isEnabled();
  }

  async isCheckoutEnabled() {
    return this.checkoutButton.isEnabled();
  }

  async isContinueShoppingEnabled() {
    return this.continueButton.isEnabled();
  }

  async removeItem() {
    await this.removeButton.click();
  }

  async getCartBadgeCount() {
    // When cart is empty, saucedemo removes badge from DOM entirely (not "0")
    // .count() returns 0 when no elements match — no error thrown
    return this.page.getByTestId('shopping-cart-badge').count();
  }
}

module.exports = CartPage;
