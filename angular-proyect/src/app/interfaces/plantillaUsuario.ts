import { Libro } from "./plantillaLibro";

export interface Usuario{
    id: string,
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    carrito: Libro[],
    favoritos: number[],
    rol: string,
}   