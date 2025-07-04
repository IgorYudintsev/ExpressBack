 import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {authRepository, UserType} from "../repositories/auth-repository";
 import dotenv from 'dotenv';
 dotenv.config();

 const JWT_SECRET = process.env.JWT_SECRET!;

export const authService={
    async register(login: string, password: string): Promise<UserType | null> {
        const existing = await authRepository.findByLogin(login);
        if (existing) return null;

        const passwordHash = await bcrypt.hash(password, 10);
        return await authRepository.createUser({ login, passwordHash });
    },

        async login(login: string, password: string): Promise<string | null> {
        const user = await authRepository.findByLogin(login);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        // создаем JWT токен
        return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "14d" }); //1h -один час
    }
}

