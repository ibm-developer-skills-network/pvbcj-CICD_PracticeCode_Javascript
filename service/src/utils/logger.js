/**
 * Logger configuration
 * 
 * This module contains utility functions to set up logging consistently
 */
const winston = require('winston');

// Define the logger format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss Z' }),
  winston.format.printf(({ level, message, timestamp, module }) => {
    return `[${timestamp}] [${level.toUpperCase()}] [${module || 'app'}] ${message}`;
  })
);

// Create a Winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console()
  ]
});

// Export the logger
module.exports = logger;