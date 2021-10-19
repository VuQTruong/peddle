export abstract class AppError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype)
  }

  abstract getErrors(): {message: string, field?: string}[];
}
