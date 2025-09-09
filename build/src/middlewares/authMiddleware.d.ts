import { Request, Response, NextFunction } from 'express';
export declare const authMiddleware: (requiredRole?: "admin" | "user") => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authMiddleware.d.ts.map