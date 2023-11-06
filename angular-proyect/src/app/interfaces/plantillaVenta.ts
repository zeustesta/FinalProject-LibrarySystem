import { Libro } from "./plantillaLibro"
export interface Venta{
    idVenta: string,
    idUsuario: string,
    fechaCompra: Date,
    idsLibros: number[],
    total: number
}