"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_OPTIONS = exports.COOKIE_NAME = void 0;
exports.COOKIE_NAME = 'ben_token';
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true, // toujours true pour sameSite none (HTTPS obligatoire)
    sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax'),
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    path: '/',
};
