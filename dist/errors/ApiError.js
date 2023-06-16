"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom error format
class ApiError extends Error {
    constructor(statusCode, message, stack = "") {
        super(message); // Call the parent class constructor with the error message
        this.statusCode = statusCode; // Store the status code in the instance property
        if (stack) {
            this.stack = stack; // If a stack trace is provided, assign it to the instance property
        }
        else {
            Error.captureStackTrace(this, this.constructor); // Capture the stack trace for the error
        }
    }
}
exports.default = ApiError;
