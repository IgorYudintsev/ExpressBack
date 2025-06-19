import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

 const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017";
// const mongoURI = "mongodb://mongo:dbTBMqHbexqkrpeLnCzRNXBZzTUNyibm@interchange.proxy.rlwy.net:58173/kiberRus?authSource=admin";



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
