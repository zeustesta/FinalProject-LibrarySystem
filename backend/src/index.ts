import Server from "./models/ServerModel";
import { seedDatabase } from "./seeds/seed";
import { seedClients } from "./seeds/seedClientes";

const server = new Server()

// seedDatabase(); //USADO PARA BAJAR LA INFO A LA BASE DE DATOS
// seedClients(); //USADO PARA CREAR ADMIN Y USUARIO
 