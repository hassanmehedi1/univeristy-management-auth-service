"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleCastErrror_1 = __importDefault(require("../../errors/handleCastErrror"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
// Global error handler middleware
const globalErrorHandler = (err, // Error object received
req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    config_1.default.env === "development"
        ? console.log("globalErrorHandler ~", err)
        : console.log("globalErrorHandler ~", err);
    let statusCode = 500; // Default status code for internal server error
    let message = "Something Went Wrong"; // Default error message
    let errorMessages = []; // Array to store specific error messages
    // Check if the error is a validation error
    if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        // Handle validation error using a separate function
        const simplifiedError = (0, handleValidationError_1.default)(err);
        // Update status code, error message, and error messages array from the simplified error object
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    // Check if the error is an instance of the custom ApiError class
    else if (err instanceof ApiError_1.default) {
        // Update status code and error message from the ApiError object
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        // Check if the ApiError has a message
        if (err === null || err === void 0 ? void 0 : err.message) {
            // Add the error message to the error messages array
            errorMessages = [
                {
                    path: "",
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ];
        }
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleCastErrror_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    // Check if the error is a generic Error object
    else if (err instanceof mongoose_1.Error) {
        // Update error message from the Error object
        message = err === null || err === void 0 ? void 0 : err.message;
        // Check if the Error has a message
        if (err === null || err === void 0 ? void 0 : err.message) {
            // Add the error message to the error messages array
            errorMessages = [
                {
                    path: "",
                    message: err === null || err === void 0 ? void 0 : err.message,
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
        stack: config_1.default.env !== "production" ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
