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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const product = __importStar(require("../controllers/productController"));
const auth_1 = require("../middlewares/auth");
const roleCheck_1 = require("../middlewares/roleCheck");
const validation_1 = require("../middlewares/validation");
const cloudinaryService_1 = require("../services/cloudinaryService");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024, files: 3 },
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype?.startsWith('image/'))
            return cb(new Error('Fichier invalide (image uniquement)'));
        cb(null, true);
    },
});
/* ============================================================
   CATÉGORIES (publiques en lecture, admin en écriture)
   ============================================================ */
router.get('/categories', product.listCategories);
router.get('/categories/:id', product.getCategorie);
router.post('/categories', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), (0, validation_1.validateBody)(['nom']), product.createCategorie);
router.put('/categories/:id', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), product.updateCategorie);
router.delete('/categories/:id', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), product.deleteCategorie);
/* ============================================================
   PRODUITS
   ============================================================ */
router.post('/images/upload', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), upload.array('images', 3), async (req, res, next) => {
    try {
        const files = req.files || [];
        if (files.length === 0) {
            res.status(400).json({ success: false, message: 'Aucune image reçue' });
            return;
        }
        const urls = await Promise.all(files.map(cloudinaryService_1.uploadProductImageBuffer));
        res.json({ success: true, message: 'Images uploadées', data: { urls } });
    }
    catch (err) {
        next(err);
    }
});
// Publiques : voir les produits publiés
router.get('/', product.listProduits);
router.get('/admin', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), product.listProduitsAdmin);
router.get('/:id', product.getProduit);
// Admin : gestion complète
router.post('/', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), (0, validation_1.validateBody)(['nom', 'description', 'prix', 'stock', 'categorie_id']), product.createProduit);
router.put('/:id', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), product.updateProduit);
router.delete('/:id', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), product.deleteProduit);
/* ============================================================
   LIKES
   ============================================================ */
router.get('/:id/likes/count', product.getLikesCount);
router.get('/:id/likes/status', auth_1.requireAuth, product.getLikeStatus);
router.post('/:id/like', auth_1.requireAuth, product.toggleLike);
exports.default = router;
