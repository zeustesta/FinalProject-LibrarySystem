import { Libro } from "./plantillaLibro"
export interface Venta{
    idVenta: String,
    idUsuario: String,
    fechaCompra: Date,
    idsLibros: Number[],
    total: Number
}