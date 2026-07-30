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
exports.createCommande = createCommande;
exports.getMyCommandes = getMyCommandes;
exports.getCommande = getCommande;
exports.cancelCommande = cancelCommande;
exports.getAllCommandes = getAllCommandes;
exports.updateStatut = updateStatut;
const orderService = __importStar(require("../services/orderService"));
/* ── Créer une commande (utilisateur connecté) ── */
async function createCommande(req, res, next) {
    try {
        const userId = res.locals.user.id;
        const commande = await orderService.createCommande({ ...req.body, utilisateur_id: userId });
        res.status(201).json({ success: true, message: 'Commande créée', data: commande });
    }
    catch (err) {
        next(err);
    }
}
/* ── Mes commandes ── */
async function getMyCommandes(_req, res, next) {
    try {
        const commandes = await orderService.getCommandesUtilisateur(res.locals.user.id);
        res.json({ success: true, data: commandes });
    }
    catch (err) {
        next(err);
    }
}
/* ── Détail d'une commande ── */
async function getCommande(req, res, next) {
    try {
        const commande = await orderService.getCommandeById(req.params.id, res.locals.user.id, res.locals.user.role);
        res.json({ success: true, data: commande });
    }
    catch (err) {
        next(err);
    }
}
/* ── Annuler une commande ── */
async function cancelCommande(req, res, next) {
    try {
        const commande = await orderService.cancelCommande(req.params.id, res.locals.user.id);
        res.json({ success: true, message: 'Commande annulée', data: commande });
    }
    catch (err) {
        next(err);
    }
}
/* ── Toutes les commandes (admin) ── */
async function getAllCommandes(req, res, next) {
    try {
        const statut = req.query.statut;
        const page = parseInt(String(req.query.page ?? 1), 10);
        const limite = parseInt(String(req.query.limite ?? 20), 10);
        const result = await orderService.getAllCommandes({ statut, page, limite });
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
}
/* ── Mettre à jour le statut (admin) ── */
async function updateStatut(req, res, next) {
    try {
        const { statut } = req.body;
        const commande = await orderService.updateStatutCommande(req.params.id, statut);
        res.json({ success: true, message: 'Statut mis à jour', data: commande });
    }
    catch (err) {
        next(err);
    }
}
