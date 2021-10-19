import { AppError } from "./app-error";

export class DatabaseConnectionError extends AppError {
  reason = "Database connection error";
  statusCode = 500;

  constructor() {
    super("Database connection error");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  getErrors() {
    return [{message:  this.reason}];
  }
}
