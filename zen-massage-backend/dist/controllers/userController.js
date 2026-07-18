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
exports.list = list;
exports.stats = stats;
exports.updateRole = updateRole;
exports.create = create;
exports.toggleActive = toggleActive;
const userService = __importStar(require("../services/userService"));
const authService = __importStar(require("../services/authService"));
async function list(_req, res, next) {
    try {
        const users = await userService.getUsers();
        res.json({ success: true, data: users });
    }
    catch (err) {
        next(err);
    }
}
async function stats(_req, res, next) {
    try {
        const s = await userService.getUserStats();
        res.json({ success: true, data: s });
    }
    catch (err) {
        next(err);
    }
}
async function updateRole(req, res, next) {
    try {
        const userId = req.params.userId;
        const { role } = req.body;
        if (!role || !['SUPER_ADMIN', 'ADMIN', 'USER'].includes(role)) {
            res.status(400).json({ success: false, message: 'Rôle invalide' });
            return;
        }
        const user = await userService.updateUserRole(userId, role);
        res.json({ success: true, data: user, message: 'Rôle mis à jour' });
    }
    catch (err) {
        next(err);
    }
}
async function create(req, res, next) {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ success: false, message: 'Champs obligatoires : firstName, lastName, email, password' });
            return;
        }
        const user = await authService.register({
            firstName,
            lastName,
            email,
            password,
            phone,
        });
        // Si un rôle différent de USER est demandé, l'appliquer
        if (role && role !== 'USER') {
            const updated = await userService.updateUserRole(user.id, role);
            res.status(201).json({ success: true, data: updated, message: 'Utilisateur créé avec succès' });
            return;
        }
        res.status(201).json({ success: true, data: user, message: 'Utilisateur créé avec succès' });
    }
    catch (err) {
        next(err);
    }
}
async function toggleActive(req, res, next) {
    try {
        const userId = req.params.userId;
        const user = await userService.toggleUserActive(userId);
        res.json({ success: true, data: user, message: 'Statut utilisateur modifié' });
    }
    catch (err) {
        next(err);
    }
}
