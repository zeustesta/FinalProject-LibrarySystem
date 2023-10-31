import { Libro } from "./plantillaLibro"
export interface Carrito{
    idCompra:number,
    fechaCompra: Date,
    libros: Libro[];
}