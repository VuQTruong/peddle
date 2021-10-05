import { AppError } from "./app-error";

export class BadRequestError extends AppError{
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    getErrorMessage() {
      return this.message;
    }
}