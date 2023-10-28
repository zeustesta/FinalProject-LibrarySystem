import { Libro } from "./libro"
export interface Carrito{
    idCompra:number,
    fechaCompra: Date,
    libros: Libro[];
}