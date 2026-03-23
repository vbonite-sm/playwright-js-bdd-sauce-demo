const BasePage = require('./BasePage');
const { createProductsLocators } = require('./locators/ProductsLocators');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = createProductsLocators(page);
  }

  async getAllProducts() {
    const count = await this.locators.inventoryItem.count();
    const products = [];
    for (let i = 0; i < count; i++) {
      const item = this.locators.inventoryItem.nth(i);
      const name = await item.getByTestId('inventory-item-name').textContent();
      const description = await item.getByTestId('inventory-item-desc').textContent();
      const price = await item.getByTestId('inventory-item-price').textContent();
      products.push({ name: name.trim(), description: description.trim(), price: price.trim() });
    }
    return products;
  }

  async addFirstProductToCart() {
    await this.locators.addToCartButton.nth(0).click();
  }

  async getCartQuantity() {
    await this.locators.cartBadge.waitFor({ state: 'visible' });
    return this.locators.cartBadge.textContent();
  }

  async goToCart() {
    await this.locators.cartLink.click();
  }
}

module.exports = ProductsPage;
