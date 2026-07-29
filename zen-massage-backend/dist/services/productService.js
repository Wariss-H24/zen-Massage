"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorie = createCategorie;
exports.updateCategorie = updateCategorie;
exports.deleteCategorie = deleteCategorie;
exports.getAllCategories = getAllCategories;
exports.getCategorieById = getCategorieById;
exports.createProduit = createProduit;
exports.updateProduit = updateProduit;
exports.deleteProduit = deleteProduit;
exports.listProduits = listProduits;
exports.getProduitById = getProduitById;
exports.toggleLike = toggleLike;
exports.getLikesCount = getLikesCount;
exports.getLikeStatus = getLikeStatus;
const prisma_1 = require("../prisma");
/* ============================================================
   CATÉGORIES
   ============================================================ */
async function createCategorie(data) {
    const exists = await prisma_1.prisma.categorie.findUnique({ where: { nom: data.nom } });
    if (exists) {
        const err = new Error('Une catégorie avec ce nom existe déjà');
        err.status = 409;
        throw err;
    }
    return prisma_1.prisma.categorie.create({ data });
}
async function updateCategorie(id, data) {
    const cat = await prisma_1.prisma.categorie.findUnique({ where: { id } });
    if (!cat) {
        const err = new Error('Catégorie introuvable');
        err.status = 404;
        throw err;
    }
    return prisma_1.prisma.categorie.update({ where: { id }, data });
}
async function deleteCategorie(id) {
    const cat = await prisma_1.prisma.categorie.findUnique({ where: { id } });
    if (!cat) {
        const err = new Error('Catégorie introuvable');
        err.status = 404;
        throw err;
    }
    const linkedProducts = await prisma_1.prisma.produit.count({ where: { categorie_id: id } });
    if (linkedProducts > 0) {
        const err = new Error('Impossible de supprimer : des produits sont liés à cette catégorie');
        err.status = 400;
        throw err;
    }
    return prisma_1.prisma.categorie.delete({ where: { id } });
}
async function getAllCategories() {
    return prisma_1.prisma.categorie.findMany({
        orderBy: [{ ordre: 'asc' }, { createdAt: 'asc' }],
    });
}
async function getCategorieById(id) {
    const cat = await prisma_1.prisma.categorie.findUnique({
        where: { id },
        include: { produits: true },
    });
    if (!cat) {
        const err = new Error('Catégorie introuvable');
        err.status = 404;
        throw err;
    }
    return cat;
}
/* ============================================================
   PRODUITS
   ============================================================ */
function applyOrderBy(tri) {
    switch (tri) {
        case 'prix_asc':
            return { prix: 'asc' };
        case 'prix_desc':
            return { prix: 'desc' };
        case 'populaire':
            return { likes: { _count: 'desc' } };
        case 'avis_desc':
            return { avis: { _count: 'desc' } };
        case 'recent':
        default:
            return { createdAt: 'desc' };
    }
}
function formatSku(skuNumber) {
    return `ZEN-PROD-${String(skuNumber).padStart(3, '0')}`;
}
async function createProduit(data) {
    await getCategorieById(data.categorie_id);
    if (data.sku) {
        const exists = await prisma_1.prisma.produit.findUnique({ where: { sku: data.sku } });
        if (exists) {
            const err = new Error('Un produit avec ce SKU existe déjà');
            err.status = 409;
            throw err;
        }
    }
    return prisma_1.prisma.$transaction(async (tx) => {
        const created = await tx.produit.create({
            data,
            select: { id: true, sku: true, sku_number: true },
        });
        if (created.sku) {
            return tx.produit.findUnique({
                where: { id: created.id },
                include: { categorie: true },
            });
        }
        const skuNumber = created.sku_number ??
            (await tx.produit.findUnique({
                where: { id: created.id },
                select: { sku_number: true },
            }))?.sku_number;
        if (!skuNumber) {
            const err = new Error('Erreur génération SKU (sku_number manquant)');
            err.status = 500;
            throw err;
        }
        const sku = formatSku(skuNumber);
        await tx.produit.update({
            where: { id: created.id },
            data: { sku },
        });
        return tx.produit.findUnique({
            where: { id: created.id },
            include: { categorie: true },
        });
    });
}
async function updateProduit(id, data) {
    const prod = await prisma_1.prisma.produit.findUnique({ where: { id } });
    if (!prod) {
        const err = new Error('Produit introuvable');
        err.status = 404;
        throw err;
    }
    if (data.categorie_id)
        await getCategorieById(data.categorie_id);
    if (data.sku && data.sku !== prod.sku) {
        const exists = await prisma_1.prisma.produit.findUnique({ where: { sku: data.sku } });
        if (exists) {
            const err = new Error('Un produit avec ce SKU existe déjà');
            err.status = 409;
            throw err;
        }
    }
    return prisma_1.prisma.produit.update({
        where: { id },
        data,
        include: { categorie: true },
    });
}
async function deleteProduit(id) {
    const prod = await prisma_1.prisma.produit.findUnique({ where: { id } });
    if (!prod) {
        const err = new Error('Produit introuvable');
        err.status = 404;
        throw err;
    }
    return prisma_1.prisma.produit.delete({ where: { id } });
}
async function listProduits(filters = {}, isAdmin = false) {
    const where = {};
    if (filters.categorie_id)
        where.categorie_id = filters.categorie_id;
    if (filters.publie !== undefined) {
        where.publie = filters.publie;
    }
    else if (!isAdmin) {
        where.publie = true;
    }
    if (filters.recherche) {
        where.OR = [
            { nom: { contains: filters.recherche, mode: 'insensitive' } },
            { description: { contains: filters.recherche, mode: 'insensitive' } },
        ];
    }
    const page = Math.max(1, filters.page ?? 1);
    const limite = Math.min(100, Math.max(1, filters.limite ?? 20));
    const skip = (page - 1) * limite;
    const orderBy = applyOrderBy(filters.tri);
    const [produits, total] = await Promise.all([
        prisma_1.prisma.produit.findMany({
            where,
            include: {
                categorie: true,
                _count: { select: { avis: true, likes: true } },
            },
            orderBy,
            skip,
            take: limite,
        }),
        prisma_1.prisma.produit.count({ where }),
    ]);
    return { produits, total, page, pages: Math.ceil(total / limite) };
}
async function getProduitById(id) {
    const prod = await prisma_1.prisma.produit.findUnique({
        where: { id },
        include: {
            categorie: true,
            avis: {
                include: {
                    utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
                },
                orderBy: { createdAt: 'desc' },
                take: 10,
            },
            _count: { select: { avis: true, likes: true } },
        },
    });
    if (!prod) {
        const err = new Error('Produit introuvable');
        err.status = 404;
        throw err;
    }
    const avg = await prisma_1.prisma.avis.aggregate({
        where: { produit_id: id },
        _avg: { note: true },
    });
    return { produit: prod, moyenne: avg._avg.note ?? 0 };
}
/* ============================================================
   LIKES
   ============================================================ */
async function toggleLike(produit_id, utilisateur_id) {
    const existing = await prisma_1.prisma.like.findUnique({
        where: { utilisateur_id_produit_id: { utilisateur_id, produit_id } },
    });
    if (existing) {
        await prisma_1.prisma.like.delete({
            where: { utilisateur_id_produit_id: { utilisateur_id, produit_id } },
        });
    }
    else {
        await prisma_1.prisma.like.create({ data: { produit_id, utilisateur_id } });
    }
    const count = await prisma_1.prisma.like.count({ where: { produit_id } });
    const liked = !existing;
    return { count, liked };
}
async function getLikesCount(produit_id) {
    return prisma_1.prisma.like.count({ where: { produit_id } });
}
async function getLikeStatus(produit_id, utilisateur_id) {
    const like = await prisma_1.prisma.like.findUnique({
        where: { utilisateur_id_produit_id: { utilisateur_id, produit_id } },
    });
    return !!like;
}
