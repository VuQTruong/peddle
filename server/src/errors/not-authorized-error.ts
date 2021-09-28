import { AppError } from "./app-error";

export class NotAuthorizedError extends AppError {
  statusCode = 401;

  constructor() {
    super("Not Authorized");

  }
  serializeErrors() {
    return { message: "Not authorized" };
  }
}
