const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
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
      const name = await item.getByTestId('inventory-item-name').textContent();
      const description = await item.getByTestId('inventory-item-desc').textContent();
      const price = await item.getByTestId('inventory-item-price').textContent();
      products.push({ name: name.trim(), description: description.trim(), price: price.trim() });
    }
    return products;
  }

  async addFirstProductToCart() {
    await this.page.locator('[data-test^="add-to-cart"]').nth(0).click();
  }

  async getCartQuantity() {
    await this.cartBadge.waitFor({ state: 'visible' });
    return this.cartBadge.textContent();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = ProductsPage;
