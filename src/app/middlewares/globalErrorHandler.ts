/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { ZodError } from "zod";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import handleCastError from "../../errors/handleCastErrror";
import handleValidationError from "../../errors/handleValidationError";
import handleZodError from "../../errors/handleZodError";
import { IGenericErrorMessage } from "../../interfaces/error";

// Global error handler middleware
const globalErrorHandler: ErrorRequestHandler = (
  err, // Error object received
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  config.env === "development"
    ? console.log("globalErrorHandler ~", err)
    : console.log("globalErrorHandler ~", err);

  let statusCode = 500; // Default status code for internal server error
  let message = "Something Went Wrong"; // Default error message
  let errorMessages: IGenericErrorMessage[] = []; // Array to store specific error messages

  // Check if the error is a validation error
  if (err?.name === "ValidationError") {
    // Handle validation error using a separate function
    const simplifiedError = handleValidationError(err);

    // Update status code, error message, and error messages array from the simplified error object
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // Check if the error is an instance of the custom ApiError class
  else if (err instanceof ApiError) {
    // Update status code and error message from the ApiError object
    statusCode = err?.statusCode;
    message = err?.message;

    // Check if the ApiError has a message
    if (err?.message) {
      // Add the error message to the error messages array
      errorMessages = [
        {
          path: "",
          message: err?.message,
        },
      ];
    }
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // Check if the error is a generic Error object
  else if (err instanceof Error) {
    // Update error message from the Error object
    message = err?.message;

    // Check if the Error has a message
    if (err?.message) {
      // Add the error message to the error messages array
      errorMessages = [
        {
          path: "",
          message: err?.message,
        },
      ];
    }
  }

  // Send the response with the appropriate status code, error message, error messages array, and stack trace if not in production
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    // eslint-disable-next-line no-undefined
    stack: config.env !== "production" ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
