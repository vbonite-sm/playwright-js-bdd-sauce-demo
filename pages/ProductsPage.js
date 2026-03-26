const BasePage = require('./BasePage');
const { createProductsLocators } = require('./locators/ProductsLocators');

class ProductsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = createProductsLocators(page);
  }

  async getAllProducts() {
    try {
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
    } catch (err) {
      throw new Error(`ProductsPage.getAllProducts failed: ${err.message}`, { cause: err });
    }
  }

  async addFirstProductToCart() {
    try {
      await this.locators.addToCartButton.nth(0).click();
    } catch (err) {
      throw new Error(`ProductsPage.addFirstProductToCart failed: ${err.message}`, { cause: err });
    }
  }

  async getCartQuantity() {
    try {
      await this.locators.cartBadge.waitFor({ state: 'visible' });
      return this.locators.cartBadge.textContent();
    } catch (err) {
      throw new Error(`ProductsPage.getCartQuantity failed: ${err.message}`, { cause: err });
    }
  }

  async goToCart() {
    try {
      await this.locators.cartLink.click();
    } catch (err) {
      throw new Error(`ProductsPage.goToCart failed: ${err.message}`, { cause: err });
    }
  }
}

module.exports = ProductsPage;
