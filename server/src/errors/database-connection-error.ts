import { AppError } from "./app-error";

export class DatabaseConnectionError extends AppError {
  reason = "Error connecting to database";
  statusCode = 500;

  constructor() {
    super("Error connecting to database");

  }

  serializeErrors() {
    return { message: this.reason };
  }
}
