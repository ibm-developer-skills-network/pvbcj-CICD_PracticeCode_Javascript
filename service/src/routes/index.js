/**
 * Main router module that assembles all route modules
 */
const express = require('express');
const counterRoutes = require('./counter');
const status = require('../utils/status');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * Health Endpoint
 */
router.get('/health', (req, res) => {
  res.status(status.HTTP_200_OK).json({ status: 'OK' });
});

/**
 * Index page
 */
router.get('/', (req, res) => {
  logger.info('Request for Base URL');
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  res.status(status.HTTP_200_OK).json({
    status: status.HTTP_200_OK,
    message: 'Hit Counter Service',
    version: '1.0.0',
    url: `${baseUrl}/counters`
  });
});

// Mount counter routes
router.use('/counters', counterRoutes);

module.exports = router;