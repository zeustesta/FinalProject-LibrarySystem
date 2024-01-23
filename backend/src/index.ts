import Server from "./models/ServerModel";
import dotenv from 'dotenv';
import { seedDatabase } from "./seeds/seed";

dotenv.config();
const server = new Server();

// seedDatabase(); //USADO PARA BAJAR LA INFO A LA BASE DE DATOS




