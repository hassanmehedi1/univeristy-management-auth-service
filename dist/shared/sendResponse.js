"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        data: data.data || null,
        // eslint-disable-next-line no-undefined
        meta: data.meta || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
exports.sendResponse = sendResponse;
exports.default = exports.sendResponse;
