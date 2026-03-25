const common = {
  paths: ['features/**/*.feature'],
  require: ['support/world.js', 'support/hooks.js', 'step-definitions/**/*.js'],
};

module.exports = {
  chromium: {
    ...common,
    format: ['progress-bar', 'json:reports/cucumber-report-chromium.json'],
  },
  firefox: {
    ...common,
    format: ['progress-bar', 'json:reports/cucumber-report-firefox.json'],
  },
  webkit: {
    ...common,
    format: ['progress-bar', 'json:reports/cucumber-report-webkit.json'],
  },
};
