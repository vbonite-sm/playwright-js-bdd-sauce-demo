module.exports = {
  chromium: {
    paths: ['features/**/*.feature'],
    require: ['support/world.js', 'support/hooks.js', 'step-definitions/**/*.js'],
    format: ['progress-bar', 'json:reports/cucumber-report-chromium.json'],
  },
};
