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
exports.createCategorie = createCategorie;
exports.updateCategorie = updateCategorie;
exports.deleteCategorie = deleteCategorie;
exports.listCategories = listCategories;
exports.getCategorie = getCategorie;
exports.createProduit = createProduit;
exports.updateProduit = updateProduit;
exports.deleteProduit = deleteProduit;
exports.listProduits = listProduits;
exports.listProduitsAdmin = listProduitsAdmin;
exports.getProduit = getProduit;
exports.toggleLike = toggleLike;
exports.getLikesCount = getLikesCount;
exports.getLikeStatus = getLikeStatus;
const productService = __importStar(require("../services/productService"));
/* ============================================================
   CATÉGORIES
   ============================================================ */
async function createCategorie(req, res, next) {
    try {
        const categorie = await productService.createCategorie(req.body);
        res.status(201).json({ success: true, message: 'Catégorie créée', data: categorie });
    }
    catch (err) {
        next(err);
    }
}
async function updateCategorie(req, res, next) {
    try {
        const id = req.params.id;
        const categorie = await productService.updateCategorie(id, req.body);
        res.json({ success: true, message: 'Catégorie mise à jour', data: categorie });
    }
    catch (err) {
        next(err);
    }
}
async function deleteCategorie(req, res, next) {
    try {
        const id = req.params.id;
        await productService.deleteCategorie(id);
        res.json({ success: true, message: 'Catégorie supprimée' });
    }
    catch (err) {
        next(err);
    }
}
async function listCategories(_req, res, next) {
    try {
        const categories = await productService.getAllCategories();
        res.json({ success: true, data: categories });
    }
    catch (err) {
        next(err);
    }
}
async function getCategorie(req, res, next) {
    try {
        const id = req.params.id;
        const categorie = await productService.getCategorieById(id);
        res.json({ success: true, data: categorie });
    }
    catch (err) {
        next(err);
    }
}
/* ============================================================
   PRODUITS
   ============================================================ */
function parseFilters(query) {
    const filters = {};
    if (query.categorie_id)
        filters.categorie_id = String(query.categorie_id);
    if (query.recherche)
        filters.recherche = String(query.recherche);
    if (query.tri)
        filters.tri = query.tri;
    if (query.page)
        filters.page = parseInt(String(query.page), 10) || 1;
    if (query.limite)
        filters.limite = parseInt(String(query.limite), 10) || 20;
    if (query.publie !== undefined) {
        const v = String(query.publie).toLowerCase();
        if (v === 'true' || v === '1')
            filters.publie = true;
        if (v === 'false' || v === '0')
            filters.publie = false;
    }
    return filters;
}
async function createProduit(req, res, next) {
    try {
        const produit = await productService.createProduit(req.body);
        res.status(201).json({ success: true, message: 'Produit créé', data: produit });
    }
    catch (err) {
        next(err);
    }
}
async function updateProduit(req, res, next) {
    try {
        const id = req.params.id;
        const produit = await productService.updateProduit(id, req.body);
        res.json({ success: true, message: 'Produit mis à jour', data: produit });
    }
    catch (err) {
        next(err);
    }
}
async function deleteProduit(req, res, next) {
    try {
        const id = req.params.id;
        await productService.deleteProduit(id);
        res.json({ success: true, message: 'Produit supprimé' });
    }
    catch (err) {
        next(err);
    }
}
async function listProduits(req, res, next) {
    try {
        const filters = parseFilters(req.query);
        const result = await productService.listProduits(filters);
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
}
async function listProduitsAdmin(req, res, next) {
    try {
        const filters = parseFilters(req.query);
        const result = await productService.listProduits(filters, true);
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
}
async function getProduit(req, res, next) {
    try {
        const id = req.params.id;
        const { produit, moyenne } = await productService.getProduitById(id);
        res.json({ success: true, data: { produit, moyenne } });
    }
    catch (err) {
        next(err);
    }
}
/* ============================================================
   LIKES
   ============================================================ */
async function toggleLike(req, res, next) {
    try {
        const id = req.params.id;
        const userId = res.locals.user.id;
        const result = await productService.toggleLike(id, userId);
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
}
async function getLikesCount(req, res, next) {
    try {
        const id = req.params.id;
        const count = await productService.getLikesCount(id);
        res.json({ success: true, data: { count } });
    }
    catch (err) {
        next(err);
    }
}
async function getLikeStatus(req, res, next) {
    try {
        const id = req.params.id;
        const userId = res.locals.user.id;
        const liked = await productService.getLikeStatus(id, userId);
        res.json({ success: true, data: { liked } });
    }
    catch (err) {
        next(err);
    }
}
