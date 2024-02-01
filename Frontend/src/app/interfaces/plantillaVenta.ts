import { EstadoVenta } from "../utils/enum"

export interface Venta {
    idVenta: string,
    idCliente: string,
    fechaCompra: Date,
    idsLibros: string[],
    total: number,
    estado: EstadoVenta
}