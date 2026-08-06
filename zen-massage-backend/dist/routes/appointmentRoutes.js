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
const express_1 = require("express");
const appointment = __importStar(require("../controllers/appointmentController"));
const auth_1 = require("../middlewares/auth");
const roleCheck_1 = require("../middlewares/roleCheck");
const router = (0, express_1.Router)();
// Routes publiques
router.get('/type-seances', appointment.getTypeSeances);
router.get('/public', appointment.getPublicAppointments);
router.get('/config', appointment.getScheduleConfig);
// Routes admin — gestion des types de séance
router.get('/type-seances/all', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), appointment.getAllTypeSeancesAdmin);
router.post('/type-seances', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), appointment.createTypeSeance);
router.put('/type-seances/:id', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), appointment.updateTypeSeance);
router.delete('/type-seances/:id', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), appointment.deleteTypeSeance);
// Routes utilisateur connecté
router.post('/', auth_1.requireAuth, appointment.createAppointment);
router.get('/my', auth_1.requireAuth, appointment.getMyAppointments);
router.put('/config', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), appointment.updateScheduleConfig);
router.patch('/:id/cancel', auth_1.requireAuth, appointment.cancelAppointment);
router.put('/:id', auth_1.requireAuth, appointment.updateAppointment);
// Routes admin
router.get('/all', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), appointment.getAllAppointments);
router.put('/:id/status', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), appointment.updateAppointmentStatus);
router.patch('/:id/notes-admin', auth_1.requireAuth, (0, roleCheck_1.requireRole)('ADMIN', 'SUPER_ADMIN'), appointment.updateNotesAdmin);
exports.default = router;
