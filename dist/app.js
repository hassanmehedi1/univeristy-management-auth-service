"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
// import ApiError from "./errors/ApiError";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application routes
app.use("/api/v1/", routes_1.default);
// Testing
// app.get("/", async (req: Request, res: Response, next: NextFunction) => {
// //   console.log(x);
// });
// global error handler
app.use(globalErrorHandler_1.default);
// handle not found route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Route Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "Api route not found",
            },
        ],
    });
    next();
});
exports.default = app;
