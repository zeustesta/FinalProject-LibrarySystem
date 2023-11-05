import { Libro } from "./plantillaLibro"
export interface Venta{
    idCompra: String,
    idUsuario: String,
    fechaCompra: Date,
    idsLibros: Number[],
    total: Number
}