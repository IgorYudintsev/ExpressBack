import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    throw new Error("MONGODB_URI is not set in environment variables");
}

export const client = new MongoClient(mongoURI);

export async function connectToDb(dbName: string) {
    try {
        await client.connect();
        await client.db(dbName).command({ ping: 1 });
        console.log(`✅ Connected successfully to MongoDB database: ${dbName}`);
    } catch (error) {
        console.error(`❌ Connection to ${dbName} failed:`, error);
        await client.close();
        process.exit(1);
    }
}
