import { Libro } from "./plantillaLibro"
export interface Venta{
    idCompra: String,
    idUsuario: String,
    fechaCompra: Date,
    libros: Libro[],
    total: Number
}