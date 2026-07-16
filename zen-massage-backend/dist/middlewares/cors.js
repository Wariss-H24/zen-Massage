"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const ALLOWED = [
    'http://localhost:5173',
    process.env.FRONTEND_URL,
].filter(Boolean);
exports.corsMiddleware = (0, cors_1.default)({
    origin: (origin, cb) => {
        if (!origin || ALLOWED.includes(origin))
            return cb(null, true);
        cb(new Error(`CORS: origine non autorisée — ${origin}`));
    },
    credentials: true, // indispensable pour les cookies httpOnly
});
