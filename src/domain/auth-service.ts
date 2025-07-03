 import bcrypt from "bcrypt";
import {authRepository, UserType} from "../repositories/auth-repository";


export const authService={
    async register(login: string, password: string): Promise<UserType | null> {
        const existing = await authRepository.findByLogin(login);
        if (existing) return null;

        const passwordHash = await bcrypt.hash(password, 10);
        return await authRepository.createUser({ login, passwordHash });
    },

    // async register(login: string, password: string): Promise<UserType | null> {
    //     const existing = await authRepository.findByLogin(login);
    //     if (existing) return null;
    //
    //     const passwordHash = await bcrypt.hash(password, 10);
    //     return await authRepository.createUser({ login, passwordHash });
    // },

    // async  getBooks(order: 'asc' | 'desc' = 'asc',page: number, pageSize: number):Promise<PaginationResult<BookType>> {
    //     return  booksRepository.getBooksMongoDB(order,page,pageSize)
    // },
    //
    // async postBooks( volume: string):Promise<BookType>  {
    //     const newBook:BookType = {volume};
    //     return booksRepository.postBooksMongoDB(newBook)
    // },
    //
    // async deleteBooks( id: string):Promise<{deleted: true| false}>  {
    //     return booksRepository.deleteBooksMongoDB(id)
    // }
}

//-----------------------------------------------------

// import { authRepository } from "../repositories/auth-repository";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { UserType } from "../types/user-type";
//
// const JWT_SECRET = process.env.JWT_SECRET || "secret";
//
// export const authService = {
//     async register(login: string, password: string): Promise<UserType | null> {
//         const existing = await authRepository.findByLogin(login);
//         if (existing) return null;
//
//         const passwordHash = await bcrypt.hash(password, 10);
//         return await authRepository.createUser({ login, passwordHash });
//     },
//
//     async login(login: string, password: string): Promise<string | null> {
//         const user = await authRepository.findByLogin(login);
//         if (!user) return null;
//
//         const isValid = await bcrypt.compare(password, user.passwordHash);
//         if (!isValid) return null;
//
//         // создаем JWT токен
//         return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
//     }
// };
