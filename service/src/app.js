/**
 * Express Application Setup
 */
const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const routes = require('./routes');
const errorMiddleware = require('./middleware/error');

// Create Express app
const app = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup request logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Register the routes
app.use('/', routes);

// Register error handling middleware
app.use(errorMiddleware);

module.exports = app;