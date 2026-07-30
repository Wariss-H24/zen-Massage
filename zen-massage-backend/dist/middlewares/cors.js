"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
// En production, on accepte n'importe quelle origine (le frontend est sur un domaine différent)
// En développement, on se limite à localhost
const isProd = process.env.NODE_ENV === 'production';
const ALLOWED = [
    'http://localhost:5173',
    process.env.FRONTEND_URL,
].filter(Boolean);
exports.corsMiddleware = (0, cors_1.default)({
    origin: (origin, cb) => {
        // En production : accepter toute origine (avec credentials)
        if (isProd)
            return cb(null, origin || true);
        // En dev : vérifier la liste
        if (!origin || ALLOWED.includes(origin))
            return cb(null, true);
        cb(new Error(`CORS: origine non autorisée — ${origin}`));
    },
    credentials: true, // indispensable pour les cookies httpOnly
});
