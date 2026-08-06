"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
exports.listReviews = listReviews;
exports.getReviewById = getReviewById;
exports.getProductReviewStats = getProductReviewStats;
exports.listReviewsEnhanced = listReviewsEnhanced;
exports.getReviewByIdEnhanced = getReviewByIdEnhanced;
exports.toggleVoteUtile = toggleVoteUtile;
exports.toggleMasqueAvis = toggleMasqueAvis;
exports.repondreAvis = repondreAvis;
const prisma_1 = require("../prisma");
/* ============================================================
   VALIDATIONS
   ============================================================ */
async function validateReviewInput(note, titre, contenu) {
    if (!Number.isInteger(note) || note < 1 || note > 5) {
        const err = new Error('La note doit être un entier entre 1 et 5');
        err.status = 400;
        throw err;
    }
    if (!titre || titre.length > 100) {
        const err = new Error('Le titre est obligatoire (max 100 caractères)');
        err.status = 400;
        throw err;
    }
    if (!contenu || contenu.length > 500) {
        const err = new Error('Le contenu est obligatoire (max 500 caractères)');
        err.status = 400;
        throw err;
    }
}
/* ============================================================
   CRUD
   ============================================================ */
async function createReview(data) {
    await validateReviewInput(data.note, data.titre, data.contenu);
    await prisma_1.prisma.produit.findUniqueOrThrow({
        where: { id: data.produit_id },
    }).catch(() => {
        const err = new Error('Produit introuvable');
        err.status = 404;
        throw err;
    });
    const existing = await prisma_1.prisma.avis.findUnique({
        where: { utilisateur_id_produit_id: {
                utilisateur_id: data.utilisateur_id,
                produit_id: data.produit_id,
            } },
    });
    if (existing) {
        const err = new Error('Vous avez déjà donné un avis sur ce produit');
        err.status = 409;
        throw err;
    }
    return prisma_1.prisma.avis.create({
        data,
        include: {
            utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
        },
    });
}
async function updateReview(id, userId, userRole, data) {
    const review = await prisma_1.prisma.avis.findUnique({ where: { id } });
    if (!review) {
        const err = new Error('Avis introuvable');
        err.status = 404;
        throw err;
    }
    if (review.utilisateur_id !== userId && userRole !== 'SUPER_ADMIN') {
        const err = new Error('Non autorisé');
        err.status = 403;
        throw err;
    }
    if (data.note !== undefined && (data.note < 1 || data.note > 5)) {
        const err = new Error('La note doit être entre 1 et 5');
        err.status = 400;
        throw err;
    }
    return prisma_1.prisma.avis.update({
        where: { id },
        data,
        include: {
            utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
        },
    });
}
async function deleteReview(id, userId, userRole) {
    const review = await prisma_1.prisma.avis.findUnique({ where: { id } });
    if (!review) {
        const err = new Error('Avis introuvable');
        err.status = 404;
        throw err;
    }
    if (review.utilisateur_id !== userId && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
        const err = new Error('Non autorisé');
        err.status = 403;
        throw err;
    }
    return prisma_1.prisma.avis.delete({ where: { id } });
}
async function listReviews(filters = {}) {
    const where = {};
    if (filters.produit_id)
        where.produit_id = filters.produit_id;
    let orderBy = { createdAt: 'desc' };
    switch (filters.tri) {
        case 'note_desc':
            orderBy = { note: 'desc' };
            break;
        case 'note_asc':
            orderBy = { note: 'asc' };
            break;
        case 'recent':
        default: orderBy = { createdAt: 'desc' };
    }
    const page = Math.max(1, filters.page ?? 1);
    const limite = Math.min(100, Math.max(1, filters.limite ?? 20));
    const skip = (page - 1) * limite;
    const [avis, total] = await Promise.all([
        prisma_1.prisma.avis.findMany({
            where,
            include: {
                utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
            },
            orderBy,
            skip,
            take: limite,
        }),
        prisma_1.prisma.avis.count({ where }),
    ]);
    return { avis, total, page, pages: Math.ceil(total / limite) };
}
async function getReviewById(id) {
    const review = await prisma_1.prisma.avis.findUnique({
        where: { id },
        include: {
            utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
        },
    });
    if (!review) {
        const err = new Error('Avis introuvable');
        err.status = 404;
        throw err;
    }
    return review;
}
/* ============================================================
   STATISTIQUES
   ============================================================ */
async function getProductReviewStats(produit_id) {
    const total = await prisma_1.prisma.avis.count({ where: { produit_id } });
    const agg = await prisma_1.prisma.avis.aggregate({
        where: { produit_id },
        _avg: { note: true },
    });
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    if (total > 0) {
        const notes = await prisma_1.prisma.avis.groupBy({
            by: ['note'],
            where: { produit_id },
            _count: { note: true },
        });
        for (const n of notes)
            distribution[n.note] = n._count.note;
    }
    return {
        moyenne: agg._avg.note ?? 0,
        total,
        distribution,
    };
}
/* ============================================================
   INCLUDES COMMUNS (utilisateur, réponse admin, votes)
   ============================================================ */
const reviewInclude = (utilisateur_id) => ({
    utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
    admin_repondant: { select: { id: true, firstName: true, lastName: true, avatar: true, role: true } },
    _count: {
        select: {
            votes_utiles: {
                where: { utile: true },
            },
        },
    },
    votes_utiles: utilisateur_id
        ? { where: { utilisateur_id }, take: 1, select: { utile: true } }
        : false,
});
/* ── Helper pour mapper un avis avec compteurs et vote utilisateur ── */
function mapAvis(avis, userId) {
    const utiles = Number(avis._count?.votes_utiles ?? 0);
    const monVote = (userId && avis.votes_utiles?.length ? avis.votes_utiles[0].utile : undefined);
    const { votes_utiles, _count, ...rest } = avis;
    return { ...rest, utiles, mon_vote: monVote ?? null };
}
async function listReviewsEnhanced(filters = {}, userId, isAdmin = false) {
    const where = {};
    if (filters.produit_id)
        where.produit_id = filters.produit_id;
    if (!isAdmin)
        where.masque = false; // les non-admins ne voient pas les avis masqués
    let orderBy = { createdAt: 'desc' };
    switch (filters.tri) {
        case 'note_desc':
            orderBy = { note: 'desc' };
            break;
        case 'note_asc':
            orderBy = { note: 'asc' };
            break;
        case 'recent':
        default: orderBy = { createdAt: 'desc' };
    }
    const page = Math.max(1, filters.page ?? 1);
    const limite = Math.min(100, Math.max(1, filters.limite ?? 20));
    const skip = (page - 1) * limite;
    const [raw, total] = await Promise.all([
        prisma_1.prisma.avis.findMany({
            where,
            include: reviewInclude(userId),
            orderBy,
            skip,
            take: limite,
        }),
        prisma_1.prisma.avis.count({ where }),
    ]);
    const avis = raw.map(a => mapAvis(a, userId));
    return { avis, total, page, pages: Math.ceil(total / limite) };
}
async function getReviewByIdEnhanced(id, userId) {
    const raw = await prisma_1.prisma.avis.findUnique({
        where: { id },
        include: reviewInclude(userId),
    });
    if (!raw) {
        const err = new Error('Avis introuvable');
        err.status = 404;
        throw err;
    }
    return mapAvis(raw, userId);
}
/* ============================================================
   VOTE UTILE / PAS UTILE
   ============================================================ */
async function toggleVoteUtile(avis_id, utilisateur_id, utile) {
    const avis = await prisma_1.prisma.avis.findUnique({ where: { id: avis_id } });
    if (!avis) {
        const err = new Error('Avis introuvable');
        err.status = 404;
        throw err;
    }
    const existing = await prisma_1.prisma.avisUtile.findUnique({
        where: { avis_id_utilisateur_id: { avis_id, utilisateur_id } },
    });
    let result;
    if (existing) {
        if (existing.utile === utile) {
            // Annuler le vote
            await prisma_1.prisma.avisUtile.delete({ where: { avis_id_utilisateur_id: { avis_id, utilisateur_id } } });
            const utiles = await prisma_1.prisma.avisUtile.count({ where: { avis_id, utile: true } });
            result = { utiles, mon_vote: null };
        }
        else {
            // Changer le vote
            await prisma_1.prisma.avisUtile.update({
                where: { avis_id_utilisateur_id: { avis_id, utilisateur_id } },
                data: { utile },
            });
            const utiles = await prisma_1.prisma.avisUtile.count({ where: { avis_id, utile: true } });
            result = { utiles, mon_vote: utile };
        }
    }
    else {
        await prisma_1.prisma.avisUtile.create({ data: { avis_id, utilisateur_id, utile } });
        const utiles = await prisma_1.prisma.avisUtile.count({ where: { avis_id, utile: true } });
        result = { utiles, mon_vote: utile };
    }
    return result;
}
/* ============================================================
   MASQUER / DÉMASQUER UN AVIS (Admin)
   ============================================================ */
async function toggleMasqueAvis(avis_id) {
    const avis = await prisma_1.prisma.avis.findUnique({ where: { id: avis_id } });
    if (!avis) {
        const err = new Error('Avis introuvable');
        err.status = 404;
        throw err;
    }
    return prisma_1.prisma.avis.update({
        where: { id: avis_id },
        data: { masque: !avis.masque },
        include: reviewInclude(),
    });
}
/* ============================================================
   RÉPONSE ADMIN À UN AVIS
   ============================================================ */
async function repondreAvis(avis_id, admin_id, reponse) {
    const avis = await prisma_1.prisma.avis.findUnique({ where: { id: avis_id } });
    if (!avis) {
        const err = new Error('Avis introuvable');
        err.status = 404;
        throw err;
    }
    const updated = await prisma_1.prisma.avis.update({
        where: { id: avis_id },
        data: {
            reponse_admin: reponse,
            reponse_admin_at: reponse ? new Date() : null,
            reponse_admin_id: reponse ? admin_id : null,
        },
        include: reviewInclude(),
    });
    return mapAvis(updated);
}
