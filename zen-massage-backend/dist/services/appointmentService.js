"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeSeances = getTypeSeances;
exports.getAllAppointmentsPublic = getAllAppointmentsPublic;
exports.getTypeSeanceById = getTypeSeanceById;
exports.createAppointment = createAppointment;
exports.getUserAppointments = getUserAppointments;
exports.getAllAppointments = getAllAppointments;
exports.updateAppointmentStatus = updateAppointmentStatus;
exports.deleteAppointment = deleteAppointment;
exports.updateAppointment = updateAppointment;
exports.cancelAppointment = cancelAppointment;
const prisma_1 = require("../prisma");
// Récupérer tous les types de séance actifs
async function getTypeSeances() {
    return await prisma_1.prisma.typeSeance.findMany({
        where: { actif: true },
        orderBy: { createdAt: 'asc' }
    });
}
// Récupérer TOUS les rendez-vous (version publique, sans données sensibles)
async function getAllAppointmentsPublic() {
    return await prisma_1.prisma.rendezVous.findMany({
        select: {
            id: true,
            date_heure: true,
            duree: true,
            statut: true,
            type_seance_id: true
        },
        orderBy: { date_heure: 'desc' }
    });
}
// Récupérer un type de séance par ID
async function getTypeSeanceById(id) {
    const typeSeance = await prisma_1.prisma.typeSeance.findUnique({
        where: { id }
    });
    if (!typeSeance) {
        const err = new Error('Type de séance introuvable');
        err.status = 404;
        throw err;
    }
    return typeSeance;
}
// Créer un rendez-vous
async function createAppointment(data) {
    // Vérifier que le type de séance existe
    await getTypeSeanceById(data.type_seance_id);
    // Vérifier que le créneau n'est pas déjà pris
    const existingAppointment = await prisma_1.prisma.rendezVous.findFirst({
        where: {
            date_heure: data.date_heure,
            statut: { notIn: ['CANCELLED'] }
        }
    });
    if (existingAppointment) {
        const err = new Error('Ce créneau est déjà réservé');
        err.status = 409;
        throw err;
    }
    return await prisma_1.prisma.rendezVous.create({
        data,
        include: {
            type_seance: true,
            utilisateur: { select: { id: true, email: true, firstName: true, lastName: true } }
        }
    });
}
// Récupérer les rendez-vous d'un utilisateur
async function getUserAppointments(userId) {
    return await prisma_1.prisma.rendezVous.findMany({
        where: { utilisateur_id: userId },
        include: { type_seance: true },
        orderBy: { date_heure: 'desc' }
    });
}
// Récupérer tous les rendez-vous (admin)
async function getAllAppointments() {
    return await prisma_1.prisma.rendezVous.findMany({
        include: {
            type_seance: true,
            utilisateur: { select: { id: true, email: true, firstName: true, lastName: true } }
        },
        orderBy: { date_heure: 'desc' }
    });
}
// Mettre à jour le statut d'un rendez-vous (admin)
async function updateAppointmentStatus(id, statut, raison_refus) {
    return await prisma_1.prisma.rendezVous.update({
        where: { id },
        data: { statut: statut, raison_refus },
        include: {
            type_seance: true,
            utilisateur: { select: { id: true, email: true, firstName: true, lastName: true } }
        }
    });
}
// Supprimer un rendez-vous
async function deleteAppointment(id, userId) {
    const appointment = await prisma_1.prisma.rendezVous.findUnique({ where: { id } });
    if (!appointment) {
        const err = new Error('Rendez-vous introuvable');
        err.status = 404;
        throw err;
    }
    // Vérifier que l'utilisateur est le propriétaire
    if (appointment.utilisateur_id !== userId) {
        const err = new Error('Non autorisé');
        err.status = 403;
        throw err;
    }
    return await prisma_1.prisma.rendezVous.delete({ where: { id } });
}
// Modifier un rendez-vous
async function updateAppointment(id, userId, data) {
    const appointment = await prisma_1.prisma.rendezVous.findUnique({ where: { id } });
    if (!appointment) {
        const err = new Error('Rendez-vous introuvable');
        err.status = 404;
        throw err;
    }
    if (appointment.utilisateur_id !== userId) {
        const err = new Error('Non autorisé');
        err.status = 403;
        throw err;
    }
    if (appointment.statut !== 'PENDING') {
        const err = new Error('Impossible de modifier un rendez-vous non en attente');
        err.status = 400;
        throw err;
    }
    // Si on change la date/heure, vérifier que le créneau est disponible
    if (data.date_heure) {
        const existingAppointment = await prisma_1.prisma.rendezVous.findFirst({
            where: {
                date_heure: data.date_heure,
                id: { not: id },
                statut: { notIn: ['CANCELLED'] }
            }
        });
        if (existingAppointment) {
            const err = new Error('Ce créneau est déjà réservé');
            err.status = 409;
            throw err;
        }
    }
    return await prisma_1.prisma.rendezVous.update({
        where: { id },
        data,
        include: {
            type_seance: true,
            utilisateur: { select: { id: true, email: true, firstName: true, lastName: true } }
        }
    });
}
async function cancelAppointment(id, userId) {
    const appointment = await prisma_1.prisma.rendezVous.findUnique({ where: { id } });
    if (!appointment) {
        const err = new Error('Rendez-vous introuvable');
        err.status = 404;
        throw err;
    }
    if (appointment.utilisateur_id !== userId) {
        const err = new Error('Non autorisé');
        err.status = 403;
        throw err;
    }
    if (appointment.statut !== 'PENDING') {
        const err = new Error('Impossible d annuler un rendez-vous non en attente');
        err.status = 400;
        throw err;
    }
    return await prisma_1.prisma.rendezVous.update({
        where: { id },
        data: { statut: 'CANCELLED' },
        include: {
            type_seance: true,
            utilisateur: { select: { id: true, email: true, firstName: true, lastName: true } }
        }
    });
}
