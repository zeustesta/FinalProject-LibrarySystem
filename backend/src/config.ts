import dotenv from 'dotenv';


dotenv.config();
export const PASSWORD = process.env.PASSWORD || 'admin123';
export const HOST = process.env.HOST || 'localhost';
export const USER = process.env.USER || 'root';
export const DATABASE = process.env.DATABASE || 'libreria';
export const PORT = process.env.PORT || '3000';
