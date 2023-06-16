import mongoose from "mongoose";
import { IGenericErrorResponse } from "../interfaces/common";
import { IGenericErrorMessage } from "../interfaces/error";

// Function to handle validation errors from Mongoose
export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  // Initialize an array to store the individual validation error messages
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    // Iterate over the error objects within the err.errors object
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      // Extract the path (field name causing the validation error) and the message (error message) from the error object
      return {
        path: el.path,
        message: el.message,
      };
    }
  );

  // Set the status code to 400, indicating a bad request due to validation errors
  const statusCode = 400;

  // Return an object containing the status code, a generic error message, and the array of error messages
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
