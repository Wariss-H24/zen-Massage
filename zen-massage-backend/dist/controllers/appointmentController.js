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
exports.getTypeSeances = getTypeSeances;
exports.getAllTypeSeancesAdmin = getAllTypeSeancesAdmin;
exports.createTypeSeance = createTypeSeance;
exports.updateTypeSeance = updateTypeSeance;
exports.deleteTypeSeance = deleteTypeSeance;
exports.getPublicAppointments = getPublicAppointments;
exports.createAppointment = createAppointment;
exports.getMyAppointments = getMyAppointments;
exports.getAllAppointments = getAllAppointments;
exports.updateAppointmentStatus = updateAppointmentStatus;
exports.deleteAppointment = deleteAppointment;
exports.updateAppointment = updateAppointment;
exports.cancelAppointment = cancelAppointment;
exports.getScheduleConfig = getScheduleConfig;
exports.updateScheduleConfig = updateScheduleConfig;
const appointmentService = __importStar(require("../services/appointmentService"));
const appointmentConfigService_1 = require("../services/appointmentConfigService");
async function getTypeSeances(_req, res, next) {
    try {
        const typeSeances = await appointmentService.getTypeSeances();
        res.json({ success: true, data: typeSeances });
    }
    catch (err) {
        next(err);
    }
}
async function getAllTypeSeancesAdmin(_req, res, next) {
    try {
        const typeSeances = await appointmentService.getAllTypeSeances();
        res.json({ success: true, data: typeSeances });
    }
    catch (err) {
        next(err);
    }
}
async function createTypeSeance(req, res, next) {
    try {
        const typeSeance = await appointmentService.createTypeSeance(req.body);
        res.status(201).json({ success: true, message: 'Service créé', data: typeSeance });
    }
    catch (err) {
        next(err);
    }
}
async function updateTypeSeance(req, res, next) {
    try {
        const { id } = req.params;
        const typeSeance = await appointmentService.updateTypeSeance(id, req.body);
        res.json({ success: true, message: 'Service mis à jour', data: typeSeance });
    }
    catch (err) {
        next(err);
    }
}
async function deleteTypeSeance(req, res, next) {
    try {
        const { id } = req.params;
        await appointmentService.deleteTypeSeance(id);
        res.json({ success: true, message: 'Service supprimé' });
    }
    catch (err) {
        next(err);
    }
}
async function getPublicAppointments(_req, res, next) {
    try {
        const appointments = await appointmentService.getAllAppointmentsPublic();
        res.json({ success: true, data: appointments });
    }
    catch (err) {
        next(err);
    }
}
async function createAppointment(req, res, next) {
    try {
        const appointment = await appointmentService.createAppointment({
            ...req.body,
            utilisateur_id: res.locals.user.id,
        });
        res.status(201).json({
            success: true,
            message: 'Rendez-vous cree avec succes',
            data: appointment,
        });
    }
    catch (err) {
        next(err);
    }
}
async function getMyAppointments(_req, res, next) {
    try {
        const appointments = await appointmentService.getUserAppointments(res.locals.user.id);
        res.json({ success: true, data: appointments });
    }
    catch (err) {
        next(err);
    }
}
async function getAllAppointments(_req, res, next) {
    try {
        const appointments = await appointmentService.getAllAppointments();
        res.json({ success: true, data: appointments });
    }
    catch (err) {
        next(err);
    }
}
async function updateAppointmentStatus(req, res, next) {
    try {
        const { id } = req.params;
        const { statut, raison_refus } = req.body;
        const appointment = await appointmentService.updateAppointmentStatus(id, statut, raison_refus);
        res.json({ success: true, message: 'Statut mis a jour', data: appointment });
    }
    catch (err) {
        next(err);
    }
}
async function deleteAppointment(req, res, next) {
    try {
        const { id } = req.params;
        await appointmentService.deleteAppointment(id, res.locals.user.id);
        res.json({ success: true, message: 'Rendez-vous supprime' });
    }
    catch (err) {
        next(err);
    }
}
async function updateAppointment(req, res, next) {
    try {
        const { id } = req.params;
        // Convertir date_heure en Date si elle est présente
        const data = req.body.date_heure ? { ...req.body, date_heure: new Date(req.body.date_heure) } : req.body;
        const appointment = await appointmentService.updateAppointment(id, res.locals.user.id, res.locals.user.role, data);
        res.json({ success: true, message: 'Rendez-vous mis a jour', data: appointment });
    }
    catch (err) {
        next(err);
    }
}
async function cancelAppointment(req, res, next) {
    try {
        const { id } = req.params;
        const appointment = await appointmentService.cancelAppointment(id, res.locals.user.id, res.locals.user.role);
        res.json({ success: true, message: 'Rendez-vous annule', data: appointment });
    }
    catch (err) {
        next(err);
    }
}
async function getScheduleConfig(_req, res, next) {
    try {
        const config = await (0, appointmentConfigService_1.getAppointmentScheduleConfig)();
        res.json({ success: true, data: config });
    }
    catch (err) {
        next(err);
    }
}
async function updateScheduleConfig(req, res, next) {
    try {
        const config = await (0, appointmentConfigService_1.updateAppointmentScheduleConfig)(req.body);
        res.json({ success: true, message: 'Configuration mise à jour', data: config });
    }
    catch (err) {
        next(err);
    }
}
