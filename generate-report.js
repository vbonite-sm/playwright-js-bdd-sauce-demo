const reporter = require('multiple-cucumber-html-reporter');
const { execFile } = require('child_process');
const fs = require('node:fs');
const path = require('node:path');

const browserDisplayNames = { chromium: 'chrome', firefox: 'firefox', webkit: 'safari' };

let reportFiles;
try {
  reportFiles = fs.readdirSync('reports');
} catch (err) {
  console.error(`Failed to read reports directory: ${err.message}`);
  process.exit(1);
}

reportFiles
  .filter(f => /^cucumber-report-.+\.json$/.test(f))
  .forEach(filename => {
    const file = path.join('reports', filename);
    const raw = fs.readFileSync(file, 'utf8').trim();
    if (!raw) return;
    const browserId = filename.match(/^cucumber-report-(chromium|firefox|webkit)/)?.[1];
    const displayName = browserDisplayNames[browserId] ?? browserId ?? 'unknown';
    let features;
    try {
      features = JSON.parse(raw).map(feature => ({
        ...feature,
        metadata: {
          browser: { name: displayName },
          platform: { name: process.platform },
        },
      }));
    } catch (err) {
      console.error(`Failed to parse ${filename}: ${err.message}`);
      return;
    }
    try {
      fs.writeFileSync(file, JSON.stringify(features, null, 2));
    } catch (err) {
      console.error(`Failed to write ${filename}: ${err.message}`);
    }
  });

try {
  reporter.generate({
    jsonDir: 'reports/',
    reportPath: 'reports/html/',
    reportName: 'Saucedemo Automation Report',
    pageTitle: 'Saucedemo Test Report',
  });
} catch (err) {
  console.error(`Failed to generate HTML report: ${err.message}`);
  process.exit(1);
}

const reportPath = 'reports/html/index.html';
if (!process.env.CI) {
  if (process.platform === 'win32') {
    execFile('cmd', ['/c', 'start', '', reportPath], err => {
      if (err) console.warn(`Could not open report: ${err.message}`);
    });
  } else if (process.platform === 'darwin') {
    execFile('open', [reportPath], err => {
      if (err) console.warn(`Could not open report: ${err.message}`);
    });
  } else {
    execFile('xdg-open', [reportPath], err => {
      if (err) console.warn(`Could not open report: ${err.message}`);
    });
  }
}
