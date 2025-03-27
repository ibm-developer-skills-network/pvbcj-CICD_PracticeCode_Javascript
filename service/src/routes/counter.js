/**
 * Counter routes
 */
const express = require('express');
const counterController = require('../controllers/counter');

const router = express.Router();

// List all counters
router.get('/', counterController.listCounters);

// Create a new counter
router.post('/:name', counterController.createCounter);

// Get a specific counter
router.get('/:name', counterController.getCounter);

// Update a counter
router.put('/:name', counterController.updateCounter);

// Delete a counter
router.delete('/:name', counterController.deleteCounter);

module.exports = router;