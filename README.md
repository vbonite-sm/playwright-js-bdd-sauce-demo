# Saucedemo Automation Framework

Playwright + Cucumber (JavaScript) BDD automation framework for [saucedemo.com](https://www.saucedemo.com/).

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

Run all browsers in parallel:

```bash
npm test
```

Run a specific browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

## HTML Report

After running tests, generate the report:

```bash
npm run report
```

Open `reports/html/index.html` in a browser.

## Project Structure

```
features/          Gherkin feature files
pages/             Page Object Model classes (LoginPage, ProductsPage, CartPage)
step-definitions/  Cucumber step implementations
support/           World class (shared state) and hooks (browser lifecycle)
test-data/         Login credentials JSON
reports/           Generated JSON + HTML reports (gitignored)
screenshots/       Captured on test failure (gitignored)
```

## Credentials

Stored in `test-data/credentials.json`. Default: `standard_user` / `secret_sauce`.
