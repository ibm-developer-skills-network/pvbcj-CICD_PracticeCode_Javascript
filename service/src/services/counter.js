/**
 * Counter service
 * Handles business logic for counters
 */
const status = require('../utils/status');

// In-memory counter storage
let COUNTER = {};

/**
 * List all counters
 * @returns {Array} Array of counter objects
 */
exports.listCounters = () => {
  return Object.entries(COUNTER).map(([name, counter]) => ({
    name,
    counter
  }));
};

/**
 * Create a new counter
 * @param {String} name - Counter name
 * @returns {Object} Counter object
 * @throws {Error} If counter already exists
 */
exports.createCounter = (name) => {
  if (name in COUNTER) {
    const error = new Error(`Counter ${name} already exists`);
    error.status = status.HTTP_409_CONFLICT;
    throw error;
  }
  
  COUNTER[name] = 0;
  
  return {
    name,
    counter: 0
  };
};

/**
 * Get a specific counter
 * @param {String} name - Counter name
 * @returns {Object} Counter object
 * @throws {Error} If counter doesn't exist
 */
exports.getCounter = (name) => {
  if (!(name in COUNTER)) {
    const error = new Error(`Counter ${name} does not exist`);
    error.status = status.HTTP_404_NOT_FOUND;
    throw error;
  }
  
  return {
    name,
    counter: COUNTER[name]
  };
};

/**
 * Update a counter (increment)
 * @param {String} name - Counter name
 * @returns {Object} Updated counter object
 * @throws {Error} If counter doesn't exist
 */
exports.updateCounter = (name) => {
  if (!(name in COUNTER)) {
    const error = new Error(`Counter ${name} does not exist`);
    error.status = status.HTTP_404_NOT_FOUND;
    throw error;
  }
  
  COUNTER[name] += 1;
  
  return {
    name,
    counter: COUNTER[name]
  };
};

/**
 * Delete a counter
 * @param {String} name - Counter name
 */
exports.deleteCounter = (name) => {
  if (name in COUNTER) {
    delete COUNTER[name];
  }
};

/**
 * Reset all counters (for testing)
 */
exports.resetCounters = () => {
  if (process.env.NODE_ENV === 'test') {
    COUNTER = {};
  }
};