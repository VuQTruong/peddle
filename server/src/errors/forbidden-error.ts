import { AppError } from "./app-error";

export class ForbiddenError extends AppError{
    statusCode = 403;
    reason = "Forbidden"

    constructor(public message: string) {
        super("Forbidden");

        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }

    getErrors() {
      return [{ message: this.message }];
    }
}