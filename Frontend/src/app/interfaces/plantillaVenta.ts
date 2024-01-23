import { EstadoVenta } from "../utils/enum"

export interface Venta {
    idVenta: string,
    idUsuario: string,
    fechaCompra: Date,
    idsLibros: string[],
    total: number,
    estado: EstadoVenta
}