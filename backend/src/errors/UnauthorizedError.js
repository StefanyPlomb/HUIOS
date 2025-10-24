export default class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message, "UnauthorizedError", 401);
  }
}