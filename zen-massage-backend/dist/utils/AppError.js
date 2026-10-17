"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'AppError';
        this.status = status;
        // Nécessaire pour instanceof avec les classes qui étendent Error en TypeScript
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
