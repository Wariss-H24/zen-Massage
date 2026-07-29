"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = require("./middlewares/cors");
const errorHandler_1 = require("./middlewares/errorHandler");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(cors_1.corsMiddleware);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const uploadsRoot = path_1.default.join(process.cwd(), 'public', 'uploads');
if (!fs_1.default.existsSync(uploadsRoot))
    fs_1.default.mkdirSync(uploadsRoot, { recursive: true });
app.use('/uploads', express_1.default.static(uploadsRoot));
app.use('/api', routes_1.default);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => console.log(`🌿 Ben API running on port ${PORT}`));
