const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: 'reports/',
  reportPath: 'reports/html/',
  reportName: 'Saucedemo Automation Report',
  pageTitle: 'Saucedemo Test Report',
  metadata: {
    browser: { name: 'chromium | firefox | webkit' },
    platform: { name: process.platform },
  },
});
