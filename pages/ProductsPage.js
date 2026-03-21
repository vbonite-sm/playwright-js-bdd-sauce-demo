class ProductsPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.getByTestId('inventory-list');
  }
}
module.exports = ProductsPage;
