import { AppError } from './app-error';

export class ServerError extends AppError {
  statusCode = 500;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  getErrorMessage() {
    return this.message;
  }
}
