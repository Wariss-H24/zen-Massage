"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwt_1 = require("../utils/jwt");
const constants_1 = require("../utils/constants");
function requireAuth(req, res, next) {
    const token = req.cookies?.[constants_1.COOKIE_NAME];
    if (!token) {
        res.status(401).json({ success: false, message: 'Non authentifié' });
        return;
    }
    try {
        res.locals.user = (0, jwt_1.verifyToken)(token);
        next();
    }
    catch {
        res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
    }
}
