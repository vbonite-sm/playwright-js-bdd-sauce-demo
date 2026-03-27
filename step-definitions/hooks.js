const { Before, After } = require('@cucumber/cucumber');
const { chromium, firefox, webkit, selectors } = require('@playwright/test');
const logger = require('../support/logger');

selectors.setTestIdAttribute('data-test');
const fs = require('fs').promises;
const path = require('path');
const { createPages } = require('../pages');

const BROWSERS = { chromium, firefox, webkit };

Before(async function (scenario) {
  logger.info(`scenario: ${scenario.pickle.name}`);
  const browserName = process.env.BROWSER || 'chromium';
  this._startTime = Date.now();
  this.browser = await BROWSERS[browserName].launch({ headless: process.env.HEADLESS !== 'false' });
  const context = await this.browser.newContext();
  this.page = await context.newPage();
  Object.assign(this, createPages(this.page));
});

After(async function (scenario) {
  const status = scenario.result.status;
  logger.info(`scenario: ${scenario.pickle.name} — ${status}`);
  if (status === 'FAILED') {
    const screenshot = await this.page.screenshot();
    const safeName = scenario['pickle']['name'].replace(/[^a-zA-Z0-9]/g, '_');
    await fs.mkdir('screenshots', { recursive: true });
    await fs.writeFile(path.join('screenshots', safeName + '_' + Date.now() + '.png'), screenshot);
    this.attach(screenshot, 'image/png');
  }
  await this.browser.close();
});
