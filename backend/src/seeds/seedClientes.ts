import { Cliente } from "../models/ClientesModel";

export async function seedClients(){
  try {
    await Cliente.create({
      nombre: "admin",
      apellido: "admin",
      email: "admin@gmail.com",
      password: "admin",
      rol: "admin"
    });

    await Cliente.create({
      nombre: "usuario",
      apellido: "usuario",
      email: "usuario@gmail.com",
      password: "usuario",
      rol: "usuario"
    });
  } catch (error) {
    console.log(error)
    console.log('No se han podido crear los clientes');
  }
}