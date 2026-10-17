"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("../utils/AppError");
function errorHandler(err, _req, res, _next) {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.status).json({ success: false, message: err.message });
    }
    // Erreurs inattendues : on log le stack complet mais on ne l'expose pas
    console.error(err);
    const status = err.status ?? 500;
    res.status(status).json({ success: false, message: err.message || 'Erreur serveur' });
}
