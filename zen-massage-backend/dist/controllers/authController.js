"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.me = me;
exports.updateProfile = updateProfile;
const authService = __importStar(require("../services/authService"));
const jwt_1 = require("../utils/jwt");
const constants_1 = require("../utils/constants");
async function register(req, res, next) {
    try {
        const user = await authService.register(req.body);
        const token = (0, jwt_1.signToken)({ id: user.id, role: user.role });
        res.cookie(constants_1.COOKIE_NAME, token, constants_1.COOKIE_OPTIONS);
        res.status(201).json({ success: true, message: 'Compte créé avec succès', data: user });
    }
    catch (err) {
        next(err);
    }
}
async function login(req, res, next) {
    try {
        const user = await authService.login(req.body);
        const token = (0, jwt_1.signToken)({ id: user.id, role: user.role });
        res.cookie(constants_1.COOKIE_NAME, token, constants_1.COOKIE_OPTIONS);
        res.json({ success: true, message: 'Connexion réussie', data: user });
    }
    catch (err) {
        next(err);
    }
}
async function logout(_req, res) {
    res.clearCookie(constants_1.COOKIE_NAME, { path: '/' });
    res.json({ success: true, message: 'Déconnexion réussie' });
}
async function me(req, res, next) {
    try {
        const user = await authService.getMe(res.locals.user.id);
        res.json({ success: true, message: 'OK', data: user });
    }
    catch (err) {
        next(err);
    }
}
async function updateProfile(req, res, next) {
    try {
        const user = await authService.updateProfile(res.locals.user.id, req.body);
        res.json({ success: true, message: 'Profil mis à jour avec succès', data: user });
    }
    catch (err) {
        next(err);
    }
}
