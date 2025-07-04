import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    console.log("🔍 Заголовок Authorization:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("⛔️ Нет токена или неверный формат");
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];
    console.log("🎟 Извлечённый токен:", token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("✅ Токен валиден, данные пользователя:", decoded);
        (req as any).user = decoded;
        next();
    } catch (err) {
        console.log("❌ Ошибка валидации токена:", err);
        res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};




// export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//     const authHeader = req.headers.authorization;
//
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         res.status(401).json({ message: "Unauthorized: No token provided" });
//         return;
//     }
//
//     const token = authHeader.split(" ")[1];
//
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         (req as any).user = decoded;
//         next();
//     } catch (err) {
//         res.status(403).json({ message: "Forbidden: Invalid token" });
//     }
// };

//----------------------------------
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
//
// const JWT_SECRET = process.env.JWT_SECRET!;
//
// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }
//
//     const token = authHeader.split(" ")[1];
//
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         (req as any).user = decoded;
//         next();
//     } catch (err) {
//         return res.status(403).json({ message: "Forbidden: Invalid token" });
//     }
// };
