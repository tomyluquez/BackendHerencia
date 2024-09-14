import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../db/Models/User.model";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado

    if (!token) {
        return res.status(401).json({ message: "No se proporcionó token" });
    }

    try {
        const secretKey = process.env.SECRET_KEY!;
        const decoded = jwt.verify(token, secretKey);
        req.app.locals = decoded as User; // Guardar la información del usuario en el request

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

export const authorizeRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.app.locals.Role)) {
        return res.status(403).json({ message: "No tienes permiso para acceder a esta ruta" });
    }
    next();
};
