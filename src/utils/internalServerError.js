const AppError = require("./appError");

class InternalServerError extends AppError {
  constructor() {
    super(`Something went wrong`, 500);
  }
}

module.exports = InternalServerError;