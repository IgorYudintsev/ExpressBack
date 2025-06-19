import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

 const mongoURI = process.env.MONGODB_URI
// const mongoURI = "mongodb://mongo:dbTBMqHbexqkrpeLnCzRNXBZzTUNyibm@interchange.proxy.rlwy.net:58173/kiberRus?authSource=admin";

if (!mongoURI) {
    throw new Error("MONGODB_URI is not set in environment variables");
}
export const client = new MongoClient(mongoURI);

export async function booksDb() {
    try {
        await client.connect();
        await client.db("books").command({ ping: 1 });
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Connection failed:", error);
        await client.close();
        process.exit(1); // Завершить процесс при ошибке (опционально)
    }
}
