"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
// Middleware para verificar autenticación y permisos
const authMiddleware = (requiredRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            console.log("🚀 ~ authMiddleware ~ requiredRole:", requiredRole);
            console.log("🚀 ~ authMiddleware ~ authHeader:", authHeader);
            if (requiredRole !== "admin" && !authHeader || !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
                res.status(401).json({ message: 'No autorizado: Token faltante o inválido' });
                return;
            }
            const token = authHeader.split(' ')[1];
            const validTokens = {
                'admin-token': { email: 'admin@example.com', role: 'admin' },
                'user-token': { email: 'user@example.com', role: 'user' },
            };
            if (!token)
                throw new Error("Token invalido");
            const userInfo = validTokens[token];
            if (!userInfo) {
                res.status(401).json({ message: 'No autorizado: Token inválido' });
                return;
            }
            if (requiredRole && requiredRole !== "admin") {
                res.status(401).json({ message: 'No autorizado: Usuario no encontrado' });
                return;
            }
            // Verificar el rol si se especifica
            if (!requiredRole) {
                res.status(403).json({ message: `Acceso denegado: Se requiere rol: User o Admin` });
                return;
            }
            req.user = requiredRole;
            next();
        }
        catch (error) {
            res.status(500).json({ message: `Error en autenticación: ${error instanceof Error ? error.message : 'Desconocido'}` });
        }
    });
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map