const reporter = require('multiple-cucumber-html-reporter');
const { execFile } = require('child_process');
const fs = require('node:fs');
const path = require('node:path');

const browserDisplayNames = { chromium: 'chrome', firefox: 'firefox', webkit: 'safari' };

fs.readdirSync('reports')
  .filter(f => /^cucumber-report-.+\.json$/.test(f))
  .forEach(filename => {
    const file = path.join('reports', filename);
    const raw = fs.readFileSync(file, 'utf8').trim();
    if (!raw) return;
    const browserId = filename.match(/^cucumber-report-(chromium|firefox|webkit)/)?.[1];
    const displayName = browserDisplayNames[browserId] ?? browserId ?? 'unknown';
    const features = JSON.parse(raw).map(feature => ({
      ...feature,
      metadata: {
        browser: { name: displayName },
        platform: { name: process.platform },
      },
    }));
    fs.writeFileSync(file, JSON.stringify(features, null, 2));
  });

reporter.generate({
  jsonDir: 'reports/',
  reportPath: 'reports/html/',
  reportName: 'Saucedemo Automation Report',
  pageTitle: 'Saucedemo Test Report',
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
