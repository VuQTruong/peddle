import { AppError } from './app-error';

export class RequestValidationError extends AppError {
    statusCode = 400;
    reason = "Invalid request - One or more field is invalid."

    constructor() {
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    getErrorMessage() {
        return this.reason;
    }
}