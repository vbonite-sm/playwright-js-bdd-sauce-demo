const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    format.printf(({ timestamp, level, message }) => String(timestamp) + ' [' + level + ']: ' + String(message)), // NOSONAR
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
