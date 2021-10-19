import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  statusCode = 404;
  reason = "Not found"
  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  getErrors() {
    return [{ message: this.reason }];
  }
}
