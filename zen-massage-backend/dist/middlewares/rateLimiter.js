"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRateLimiter = exports.authRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
/**
 * Limite les tentatives sur les routes d'authentification sensibles
 * (login, register, forgot-password, reset-password).
 * Max 10 requêtes par IP sur une fenêtre de 15 minutes.
 */
exports.authRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    standardHeaders: true, // renvoie les headers RateLimit-* (RFC 6585)
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Trop de tentatives. Veuillez réessayer dans 15 minutes.',
    },
    // Ignore les erreurs de store pour ne pas casser l'appli si Redis est absent
    skip: () => false,
});
/**
 * Limite plus souple pour les routes publiques en lecture.
 * Max 60 requêtes par IP par minute.
 */
exports.publicRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Trop de requêtes. Veuillez réessayer dans un instant.',
    },
});
