const CustomAPIError = require('./customAPIError');

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = UnauthorizedError;
