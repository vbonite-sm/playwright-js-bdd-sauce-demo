const reporter = require('multiple-cucumber-html-reporter');
const { execFile } = require('child_process');

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

const reportPath = 'reports/html/index.html';
if (!process.env.CI) {
  if (process.platform === 'win32') {
    execFile('cmd', ['/c', 'start', '', reportPath]);
  } else if (process.platform === 'darwin') {
    execFile('open', [reportPath]);
  } else {
    execFile('xdg-open', [reportPath]);
  }
}
