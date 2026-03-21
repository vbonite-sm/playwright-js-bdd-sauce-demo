const { Before, After } = require('@cucumber/cucumber');
const { chromium, firefox, webkit, selectors } = require('@playwright/test');

selectors.setTestIdAttribute('data-test');
const fs = require('fs').promises;
const path = require('path');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

const BROWSERS = { chromium, firefox, webkit };

Before(async function () {
  const browserName = process.env.BROWSER || 'chromium';
  this.browser = await BROWSERS[browserName].launch({ headless: true });
  const context = await this.browser.newContext();
  this.page = await context.newPage();
  this.loginPage = new LoginPage(this.page);
  this.productsPage = new ProductsPage(this.page);
  this.cartPage = new CartPage(this.page);
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await this.page.screenshot();
    // scenario['pickle']['name'] is the Cucumber.js API for scenario name
    // 'pickle' is Cucumber.js internal terminology, not Python serialization
    const scenarioName = scenario['pickle']['name'];
    const safeName = scenarioName.replace(/[^a-zA-Z0-9]/g, '_');
    await fs.mkdir('screenshots', { recursive: true });
    await fs.writeFile(path.join('screenshots', safeName + '_' + Date.now() + '.png'), screenshot);
    await this.attach(screenshot, 'image/png');
  }
  await this.browser.close();
});
