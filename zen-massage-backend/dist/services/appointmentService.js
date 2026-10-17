"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeSeances = getTypeSeances;
exports.getAllTypeSeances = getAllTypeSeances;
exports.createTypeSeance = createTypeSeance;
exports.updateTypeSeance = updateTypeSeance;
exports.deleteTypeSeance = deleteTypeSeance;
exports.getAllAppointmentsPublic = getAllAppointmentsPublic;
exports.getTypeSeanceById = getTypeSeanceById;
exports.createAppointment = createAppointment;
exports.getUserAppointments = getUserAppointments;
exports.getAllAppointments = getAllAppointments;
exports.updateAppointmentStatus = updateAppointmentStatus;
exports.updateNotesAdmin = updateNotesAdmin;
exports.deleteAppointment = deleteAppointment;
exports.updateAppointment = updateAppointment;
exports.cancelAppointment = cancelAppointment;
const prisma_1 = require("../prisma");
const AppError_1 = require("../utils/AppError");
const appointmentConfigService_1 = require("./appointmentConfigService");
function addMinutes(d, minutes) {
    return new Date(d.getTime() + minutes * 60000);
}
function startOfDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
}
function endOfDay(d) {
    const x = startOfDay(d);
    x.setDate(x.getDate() + 1);
    return x;
}
function assertScheduleAllows(config, start, durationMinutes) {
    const dayKey = (0, appointmentConfigService_1.dayKeyFromDate)(start);
    const day = config.days[dayKey];
    if (!day.active) {
        throw new AppError_1.AppError('Aucun rendez-vous possible ce jour-là', 400);
    }
    const startMin = start.getHours() * 60 + start.getMinutes();
    const endMin = startMin + durationMinutes;
    const openMin = (0, appointmentConfigService_1.minutesFromTimeString)(day.start);
    const closeMin = (0, appointmentConfigService_1.minutesFromTimeString)(day.end);
    if (openMin === null || closeMin === null) {
        throw new AppError_1.AppError('Configuration horaires invalide', 500);
    }
    if (startMin < openMin || endMin > closeMin) {
        throw new AppError_1.AppError('Créneau en dehors des heures de travail', 400);
    }
    if (config.pause) {
        const pStart = (0, appointmentConfigService_1.minutesFromTimeString)(config.pause.start);
        const pEnd = (0, appointmentConfigService_1.minutesFromTimeString)(config.pause.end);
        if (pStart !== null && pEnd !== null) {
            if ((0, appointmentConfigService_1.rangeOverlaps)(startMin, endMin, pStart, pEnd)) {
                throw new AppError_1.AppError('Créneau indisponible (pause)', 400);
            }
        }
    }
    const blocked = config.blocked?.[dayKey] ?? [];
    for (const r of blocked) {
        const bStart = (0, appointmentConfigService_1.minutesFromTimeString)(r.start);
        const bEnd = (0, appointmentConfigService_1.minutesFromTimeString)(r.end);
        if (bStart === null || bEnd === null)
            continue;
        if ((0, appointmentConfigService_1.rangeOverlaps)(startMin, endMin, bStart, bEnd)) {
            throw new AppError_1.AppError('Créneau indisponible', 400);
        }
    }
}
async function assertNoOverlappingAppointment(start, durationMinutes, excludeId) {
    const end = addMinutes(start, durationMinutes);
    const dayStart = startOfDay(start);
    const dayEnd = endOfDay(start);
    const candidates = await prisma_1.prisma.rendezVous.findMany({
        where: {
            id: excludeId ? { not: excludeId } : undefined,
            statut: { notIn: ['CANCELLED'] },
            date_heure: { gte: dayStart, lt: dayEnd },
        },
        select: { id: true, date_heure: true, duree: true },
    });
    for (const appt of candidates) {
        const apptStart = appt.date_heure;
        const apptEnd = addMinutes(apptStart, appt.duree);
        if (start < apptEnd && apptStart < end) {
            throw new AppError_1.AppError('Ce créneau est déjà réservé', 409);
        }
    }
}
// Récupérer tous les types de séance actifs
async function getTypeSeances() {
    return await prisma_1.prisma.typeSeance.findMany({
        where: { actif: true },
        orderBy: { createdAt: 'asc' }
    });
}
// Récupérer TOUS les types de séance (admin — actifs et inactifs)
async function getAllTypeSeances() {
    return await prisma_1.prisma.typeSeance.findMany({
        orderBy: { createdAt: 'asc' }
    });
}
// Créer un type de séance
async function createTypeSeance(data) {
    const existing = await prisma_1.prisma.typeSeance.findUnique({ where: { nom: data.nom } });
    if (existing) {
        throw new AppError_1.AppError('Un service avec ce nom existe déjà', 409);
    }
    return await prisma_1.prisma.typeSeance.create({ data });
}
// Modifier un type de séance
async function updateTypeSeance(id, data) {
    const existing = await prisma_1.prisma.typeSeance.findUnique({ where: { id } });
    if (!existing) {
        throw new AppError_1.AppError('Service introuvable', 404);
    }
    if (data.nom && data.nom !== existing.nom) {
        const nameConflict = await prisma_1.prisma.typeSeance.findUnique({ where: { nom: data.nom } });
        if (nameConflict) {
            throw new AppError_1.AppError('Un service avec ce nom existe déjà', 409);
        }
    }
    return await prisma_1.prisma.typeSeance.update({ where: { id }, data });
}
// Supprimer un type de séance (vérifie qu'il n'y a pas de RDV liés)
async function deleteTypeSeance(id) {
    const existing = await prisma_1.prisma.typeSeance.findUnique({ where: { id } });
    if (!existing) {
        throw new AppError_1.AppError('Service introuvable', 404);
    }
    const rdvCount = await prisma_1.prisma.rendezVous.count({ where: { type_seance_id: id } });
    if (rdvCount > 0) {
        throw new AppError_1.AppError(`Impossible de supprimer : ${rdvCount} rendez-vous utilisent ce service`, 409);
    }
    return await prisma_1.prisma.typeSeance.delete({ where: { id } });
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
    const typeSeance = await prisma_1.prisma.typeSeance.findUnique({ where: { id } });
    if (!typeSeance) {
        throw new AppError_1.AppError('Type de séance introuvable', 404);
    }
    return typeSeance;
}
// Créer un rendez-vous
async function createAppointment(data) {
    // Vérifier que le type de séance existe
    await getTypeSeanceById(data.type_seance_id);
    const date = data.date_heure instanceof Date ? data.date_heure : new Date(data.date_heure);
    const config = await (0, appointmentConfigService_1.getAppointmentScheduleConfig)();
    assertScheduleAllows(config, date, data.duree);
    await assertNoOverlappingAppointment(date, data.duree);
    return await prisma_1.prisma.rendezVous.create({
        data: { ...data, date_heure: date },
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
// Ajouter / modifier les notes privées admin sur un rendez-vous
async function updateNotesAdmin(id, notes_admin) {
    const rdv = await prisma_1.prisma.rendezVous.findUnique({ where: { id } });
    if (!rdv) {
        throw new AppError_1.AppError('Rendez-vous introuvable', 404);
    }
    return prisma_1.prisma.rendezVous.update({
        where: { id },
        data: { notes_admin },
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
        throw new AppError_1.AppError('Rendez-vous introuvable', 404);
    }
    if (appointment.utilisateur_id !== userId) {
        throw new AppError_1.AppError('Non autorisé', 403);
    }
    return await prisma_1.prisma.rendezVous.delete({ where: { id } });
}
// Modifier un rendez-vous
async function updateAppointment(id, userId, userRole, data) {
    const appointment = await prisma_1.prisma.rendezVous.findUnique({ where: { id } });
    if (!appointment) {
        throw new AppError_1.AppError('Rendez-vous introuvable', 404);
    }
    // Vérifier que l'utilisateur est propriétaire OU admin
    if (appointment.utilisateur_id !== userId && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
        throw new AppError_1.AppError('Non autorisé', 403);
    }
    // Seulement les clients ne peuvent pas modifier des rendez-vous non en attente
    if (userRole === 'USER' && appointment.statut !== 'PENDING') {
        throw new AppError_1.AppError('Impossible de modifier un rendez-vous non en attente', 400);
    }
    // Si on change la date/heure, vérifier que le créneau est disponible
    const nextDate = data.date_heure ?? appointment.date_heure;
    const nextDuree = data.duree ?? appointment.duree;
    if (data.date_heure || data.duree) {
        const config = await (0, appointmentConfigService_1.getAppointmentScheduleConfig)();
        assertScheduleAllows(config, nextDate, nextDuree);
        await assertNoOverlappingAppointment(nextDate, nextDuree, id);
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
async function cancelAppointment(id, userId, userRole) {
    const appointment = await prisma_1.prisma.rendezVous.findUnique({ where: { id } });
    if (!appointment) {
        throw new AppError_1.AppError('Rendez-vous introuvable', 404);
    }
    // Vérifier que l'utilisateur est propriétaire OU admin
    if (appointment.utilisateur_id !== userId && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
        throw new AppError_1.AppError('Non autorisé', 403);
    }
    // Seulement les clients ne peuvent pas annuler des rendez-vous non en attente
    if (userRole === 'USER' && appointment.statut !== 'PENDING') {
        throw new AppError_1.AppError("Impossible d'annuler un rendez-vous non en attente", 400);
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
