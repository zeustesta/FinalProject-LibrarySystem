import { Libro } from "./libro";
export interface Usuario{
    id:number,
    nombre: string,
    apellido:string,
    email:string,
    password:string,
    carrito:Libro[];
}