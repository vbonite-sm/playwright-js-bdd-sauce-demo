const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {
    this.browser = null;
    this.page = null;
    this.loginPage = null;
    this.productsPage = null;
    this.cartPage = null;
    this.collectedProducts = [];
  }
}

setWorldConstructor(CustomWorld);
