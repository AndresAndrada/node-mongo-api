import { Request, Response, NextFunction } from 'express';

// Middleware para verificar autenticación y permisos
export const authMiddleware = (requiredRole?: 'admin' | 'user') => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;
            console.log("🚀 ~ authMiddleware ~ requiredRole:", requiredRole)
      console.log("🚀 ~ authMiddleware ~ authHeader:", authHeader)
      if (requiredRole !== "admin" && !authHeader || !authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No autorizado: Token faltante o inválido' });
        return;
      }

      const token = authHeader.split(' ')[1];
      const validTokens: Record<string, { email: string; role: 'admin' | 'user' }> = {
        'admin-token': { email: 'admin@example.com', role: 'admin' },
        'user-token': { email: 'user@example.com', role: 'user' },
      };
      if (!token) throw new Error ("Token invalido");
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

      (req as any).user = requiredRole;
      next();
    } catch (error) {
      res.status(500).json({ message: `Error en autenticación: ${error instanceof Error ? error.message : 'Desconocido'}` });
    }
  };
};
