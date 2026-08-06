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
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
exports.listReviews = listReviews;
exports.getReview = getReview;
exports.listProductReviews = listProductReviews;
exports.voteUtile = voteUtile;
exports.repondreAvis = repondreAvis;
exports.toggleMasque = toggleMasque;
exports.getProductStats = getProductStats;
const reviewService = __importStar(require("../services/reviewService"));
function parseFilters(query) {
    const filters = {};
    if (query.produit_id)
        filters.produit_id = String(query.produit_id);
    if (query.tri)
        filters.tri = query.tri;
    if (query.page)
        filters.page = parseInt(String(query.page), 10) || 1;
    if (query.limite)
        filters.limite = parseInt(String(query.limite), 10) || 20;
    return filters;
}
async function createReview(req, res, next) {
    try {
        const userId = res.locals.user.id;
        const avis = await reviewService.createReview({
            ...req.body,
            utilisateur_id: userId,
        });
        res.status(201).json({ success: true, message: 'Avis créé', data: avis });
    }
    catch (err) {
        next(err);
    }
}
async function updateReview(req, res, next) {
    try {
        const id = req.params.id;
        const userId = res.locals.user.id;
        const userRole = res.locals.user.role;
        const avis = await reviewService.updateReview(id, userId, userRole, req.body);
        res.json({ success: true, message: 'Avis mis à jour', data: avis });
    }
    catch (err) {
        next(err);
    }
}
async function deleteReview(req, res, next) {
    try {
        const id = req.params.id;
        const userId = res.locals.user.id;
        const userRole = res.locals.user.role;
        await reviewService.deleteReview(id, userId, userRole);
        res.json({ success: true, message: 'Avis supprimé' });
    }
    catch (err) {
        next(err);
    }
}
async function listReviews(req, res, next) {
    try {
        const filters = parseFilters(req.query);
        const userId = res.locals.user?.id;
        const result = await reviewService.listReviewsEnhanced(filters, userId);
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
}
async function getReview(req, res, next) {
    try {
        const id = req.params.id;
        const userId = res.locals.user?.id;
        const avis = await reviewService.getReviewByIdEnhanced(id, userId);
        res.json({ success: true, data: avis });
    }
    catch (err) {
        next(err);
    }
}
async function listProductReviews(req, res, next) {
    try {
        const produit_id = req.params.productId;
        const filters = parseFilters(req.query);
        filters.produit_id = produit_id;
        const userId = res.locals.user?.id;
        const result = await reviewService.listReviewsEnhanced(filters, userId);
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
}
/* ── Voter Utile / Pas utile sur un avis ── */
async function voteUtile(req, res, next) {
    try {
        const avis_id = req.params.id;
        const utilisateur_id = res.locals.user.id;
        const { utile } = req.body;
        if (typeof utile !== 'boolean') {
            const err = new Error('Paramètre "utile" booléen attendu');
            err.status = 400;
            throw err;
        }
        const result = await reviewService.toggleVoteUtile(avis_id, utilisateur_id, utile);
        res.json({ success: true, message: 'Vote enregistré', data: result });
    }
    catch (err) {
        next(err);
    }
}
/* ── Répondre à un avis (ADMIN uniquement) ── */
async function repondreAvis(req, res, next) {
    try {
        const avis_id = req.params.id;
        const admin_id = res.locals.user.id;
        const { reponse } = req.body;
        const reponseClean = typeof reponse === 'string' ? reponse.trim() : null;
        const finalReponse = reponseClean && reponseClean.length > 0 ? reponseClean : null;
        if (finalReponse && finalReponse.length > 1000) {
            const err = new Error('La réponse admin est trop longue (max 1000 caractères)');
            err.status = 400;
            throw err;
        }
        const result = await reviewService.repondreAvis(avis_id, admin_id, finalReponse);
        res.json({
            success: true,
            message: finalReponse ? 'Réponse publiée' : 'Réponse supprimée',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}
/* ── Masquer / Démasquer un avis (ADMIN) ── */
async function toggleMasque(req, res, next) {
    try {
        const avis_id = req.params.id;
        const result = await reviewService.toggleMasqueAvis(avis_id);
        res.json({
            success: true,
            message: result.masque ? 'Avis masqué' : 'Avis visible',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}
async function getProductStats(req, res, next) {
    try {
        const produit_id = req.params.productId;
        const stats = await reviewService.getProductReviewStats(produit_id);
        res.json({ success: true, data: stats });
    }
    catch (err) {
        next(err);
    }
}
