const { setWorldConstructor, World, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(30000);

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.page = null;
    this.loginPage = null;
    this.productsPage = null;
    this.cartPage = null;
    this.collectedProducts = [];
  }
}

setWorldConstructor(CustomWorld);
