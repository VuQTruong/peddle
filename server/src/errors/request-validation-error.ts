import { AppError } from './app-error';
import { ValidationError } from 'express-validator';

export class RequestValidationError extends AppError {
    statusCode = 400;
    reason = "Invalid request - One or more field is invalid."

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    getErrors() {
        return this.errors.map( error => {
            return { message: error.msg, field: error.param}
        })
    }
}