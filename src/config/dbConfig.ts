import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const { DB_URL } = process.env;

export const dbConfig = async () => { 
    if (!DB_URL) throw new Error('DB_URL is not defined in environment variables')

    try {
        await mongoose.connect(DB_URL);
    } catch (error) {
        console.error(error);
    }
}