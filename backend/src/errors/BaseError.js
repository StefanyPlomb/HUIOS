export default class BaseError extends Error {
  constructor(message, name, status) {
    super(message);
    this.name = name;
    this.status = status;
  }
}