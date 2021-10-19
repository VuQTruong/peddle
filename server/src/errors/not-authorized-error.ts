import { AppError } from "./app-error";

export class NotAuthorizedError extends AppError {
  statusCode = 401;
  reason = "Not authorized";

  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  getErrors() {
    return [{ message: this.reason}];
  }
}
