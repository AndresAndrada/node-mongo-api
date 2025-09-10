import { Request, Response, NextFunction } from 'express';

interface UserInfo {
  email: string;
  role: 'admin' | 'user';
}

export const authMiddleware = (requiredRole: 'admin' | 'user') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No autorizado: Token faltante o inválido' });
        return;
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'No autorizado: Token inválido' });
        return;
      }

      const validTokens: Record<string, UserInfo> = {
        'admin-token': { email: 'admin@example.com', role: 'admin' },
        'user-token': { email: 'user@example.com', role: 'user' },
      };

      const userInfo = validTokens[token];
      if (!userInfo) {
        res.status(401).json({ message: 'No autorizado: Token no reconocido' });
        return;
      }

      // Verificar permisos
      if (requiredRole === 'admin' && userInfo.role !== 'admin') {
        res.status(403).json({ message: 'Acceso denegado: Se requiere rol admin' });
        return;
      }

      // Asignar información del usuario al request
      (req as any).user = userInfo; // Incluye email y role
      next();
    } catch (error) {
      res.status(500).json({ message: `Error en autenticación: ${error instanceof Error ? error.message : 'Desconocido'}` });
    }
  };
};