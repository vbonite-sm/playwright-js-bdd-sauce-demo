class ProductsPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.getByTestId('inventory-list');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async getAllProducts() {
    const items = this.page.locator('[data-test="inventory-item"]');
    const count = await items.count();
    const products = [];
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const name = await item.locator('.inventory_item_name').textContent();
      const price = await item.locator('.inventory_item_price').textContent();
      products.push({ name: name.trim(), price: price.trim() });
    }
    return products;
  }

  async addFirstProductToCart() {
    // nth(0) = first product in DOM order
    await this.page.locator('[data-test^="add-to-cart"]').nth(0).click();
  }

  async getCartQuantity() {
    // Returns badge text content (e.g. "1") — only call when badge is known to be visible
    return this.cartBadge.textContent();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = ProductsPage;
