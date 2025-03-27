/**
 * Server entry point
 */
require('dotenv').config();
const app = require('./src/app');
const logger = require('./src/utils/logger');

// Get the port from the environment or use 8000 as default
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  logger.info('*'.repeat(70));
  logger.info('  S E R V I C E   R U N N I N G  '.padStart(45, '*').padEnd(70, '*'));
  logger.info('*'.repeat(70));
  logger.info(`Server is listening on port ${PORT}`);
});