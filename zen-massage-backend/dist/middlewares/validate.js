"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
/**
 * Middleware générique de validation Zod.
 * Valide `req.body` contre le schéma fourni.
 * En cas d'échec, renvoie un 400 avec le détail des erreurs.
 */
function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message,
            }));
            return res.status(400).json({
                success: false,
                message: errors[0]?.message ?? 'Données invalides',
                errors,
            });
        }
        // Remplace req.body par les données parsées et assainies par Zod
        req.body = result.data;
        next();
    };
}
