import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import handleValidationError from "../../errors/handleValidationError";
import { IGenericErrorMessage } from "../../interfaces/error";

const globalErrorHandler = (
  err: Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something Went Wrong";
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError.statusCode;

    message = simplifiedError.message;

    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    // eslint-disable-next-line no-undefined
    stack: config.env !== "production" ? err?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
