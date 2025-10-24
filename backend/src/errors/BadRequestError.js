export default class BadRequestError extends BaseError {
  constructor(message) {
    super(message, "BadRequestError", 400);
  }
}