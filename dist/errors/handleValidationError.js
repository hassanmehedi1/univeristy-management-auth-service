"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
// Function to handle validation errors from Mongoose
const handleValidationError = (err) => {
    // Initialize an array to store the individual validation error messages
    const errors = Object.values(err.errors).map(
    // Iterate over the error objects within the err.errors object
    (el) => {
        // Extract the path (field name causing the validation error) and the message (error message) from the error object
        return {
            path: el.path,
            message: el.message,
        };
    });
    // Set the status code to 400, indicating a bad request due to validation errors
    const statusCode = 400;
    // Return an object containing the status code, a generic error message, and the array of error messages
    return {
        statusCode,
        message: "Validation Error",
        errorMessages: errors,
    };
};
exports.handleValidationError = handleValidationError;
exports.default = exports.handleValidationError;
