"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
function requireRole(...roles) {
    return (_req, res, next) => {
        const user = res.locals.user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ success: false, message: 'Accès refusé' });
            return;
        }
        next();
    };
}
