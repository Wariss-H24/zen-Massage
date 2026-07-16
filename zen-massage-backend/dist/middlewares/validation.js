"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
function validateBody(fields) {
    return (req, res, next) => {
        const missing = fields.filter(f => !req.body[f]);
        if (missing.length) {
            res.status(400).json({ success: false, message: `Champs manquants : ${missing.join(', ')}` });
            return;
        }
        next();
    };
}
