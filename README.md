# Playwright + Cucumber BDD Test Suite

A test automation framework for [saucedemo.com](https://www.saucedemo.com) using Playwright and Cucumber (CommonJS).

## Prerequisites

This project requires Node.js 20.

Use `nvm` to set the correct version:

```bash
nvm use
```

The `.nvmrc` file pins Node to version 20.

## Install

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run Tests

### All Browsers in Parallel

Run tests across all three browsers (Chromium, Firefox, WebKit) in parallel:

```bash
npm test
```

### Single Browser

Run tests on a specific browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### By Tag

Run tests with a specific tag (e.g., `@smoke`):

```bash
npx cucumber-js --profile chromium --tags @smoke
```

### Headed Mode

Run tests with the browser visible (instead of headless):

```bash
cross-env HEADLESS=false npm run test:chromium
```

## Report Generation

Generate an HTML report from test results:

```bash
npm run report
```

The report is saved to `reports/html/index.html` and automatically opens in your browser (unless `CI=true`).

## Test Data

### Credentials

`test-data/credentials.json` contains test user credentials for saucedemo.com:

```json
{
  "validUsers": [
    { "username": "standard_user", "password": "secret_sauce" },
    { "username": "performance_glitch_user", "password": "secret_sauce" },
    { "username": "visual_user", "password": "secret_sauce" }
  ]
}
```

Data-driven login scenarios in `features/login.feature` iterate over `validUsers`.

### CI Secrets Injection

In GitHub Actions, repository secrets (`SAUCEDEMO_USERNAME`, `SAUCEDEMO_PASSWORD`) are injected at runtime and written into `test-data/credentials.json`, overriding the committed public test credentials.

## CI Overview

GitHub Actions runs a matrix strategy across three browsers (Chromium, Firefox, WebKit).

### Test Job

- Checks out code
- Sets up Node.js 20
- Installs dependencies and Playwright browsers
- Writes credentials from repository secrets
- Runs tests on the assigned browser
- Uploads screenshots on failure
- Uploads JSON report for the browser

### Report Job

- Runs after all test jobs complete
- Downloads all JSON reports from test jobs
- Generates a combined HTML report
- Uploads the HTML report as an artifact

## Linting

Run ESLint:

```bash
npm run lint
```

## Architecture

- **Pages:** All page objects extend `BasePage` and use `page.getByTestId()` with the `data-test` attribute
- **Selectors:** Test IDs are configured globally in `support/hooks.js`
- **State:** Cross-step state is held in `CustomWorld` (e.g., `collectedProducts[]`)
- **Reports:** Generated via `multiple-cucumber-html-reporter` from JSON output by each browser
