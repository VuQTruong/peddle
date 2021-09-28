import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  statusCode = 404;
  constructor() {
    super("Route not found");

  }

  serializeErrors() {
    return { message: "Not Found" };
  }
}
