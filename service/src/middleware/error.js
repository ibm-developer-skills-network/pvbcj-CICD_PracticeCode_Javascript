/**
 * Error handling middleware
 */
const logger = require('../utils/logger');
const status = require('../utils/status');

/**
 * Get a descriptive name for an HTTP status code
 * @param {Number} code - HTTP status code
 * @returns {String} Descriptive name for the status code
 */
function getErrorName(code) {
  switch (code) {
    case status.HTTP_400_BAD_REQUEST:
      return 'Bad Request';
    case status.HTTP_404_NOT_FOUND:
      return 'Not Found';
    case status.HTTP_405_METHOD_NOT_ALLOWED:
      return 'Method Not Allowed';
    case status.HTTP_409_CONFLICT:
      return 'Conflict';
    case status.HTTP_415_UNSUPPORTED_MEDIA_TYPE:
      return 'Unsupported Media Type';
    default:
      return 'Internal Server Error';
  }
}

/**
 * Error handling middleware
 */
module.exports = (err, req, res, next) => {
  // Default to 500 Internal Server Error
  let statusCode = status.HTTP_500_INTERNAL_SERVER_ERROR;
  let errorMessage = 'Internal Server Error';
  
  // Handle specific error types
  if (err.status) {
    statusCode = err.status;
  } else if (err.statusCode) {
    statusCode = err.statusCode;
  }

  // Use the error message if provided
  if (err.message) {
    errorMessage = err.message;
  }

  // Log the error
  if (statusCode >= 500) {
    logger.error(errorMessage);
  } else {
    logger.warn(errorMessage);
  }

  // Send the error response
  res.status(statusCode).json({
    status: statusCode,
    error: getErrorName(statusCode),
    message: errorMessage
  });
};