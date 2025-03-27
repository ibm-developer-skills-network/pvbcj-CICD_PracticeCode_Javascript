/**
 * Counter controller
 */
const logger = require('../utils/logger');
const status = require('../utils/status');
const counterService = require('../services/counter');

/**
 * List all counters
 */
exports.listCounters = (req, res) => {
  logger.info('Request to list all counters...');
  
  const counters = counterService.listCounters();
  res.json(counters);
};

/**
 * Create a new counter
 */
exports.createCounter = (req, res, next) => {
  const name = req.params.name;
  logger.info(`Request to Create counter: ${name}...`);
  
  try {
    const counter = counterService.createCounter(name);
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const locationUrl = `${baseUrl}/counters/${name}`;
    
    res.setHeader('Location', locationUrl);
    res.status(status.HTTP_201_CREATED).json(counter);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a specific counter
 */
exports.getCounter = (req, res, next) => {
  const name = req.params.name;
  logger.info(`Request to Read counter: ${name}...`);
  
  try {
    const counter = counterService.getCounter(name);
    res.json(counter);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a counter (increment)
 */
exports.updateCounter = (req, res, next) => {
  const name = req.params.name;
  logger.info(`Request to Update counter: ${name}...`);
  
  try {
    const counter = counterService.updateCounter(name);
    res.json(counter);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a counter
 */
exports.deleteCounter = (req, res) => {
  const name = req.params.name;
  logger.info(`Request to Delete counter: ${name}...`);
  
  counterService.deleteCounter(name);
  res.status(status.HTTP_204_NO_CONTENT).send();
};