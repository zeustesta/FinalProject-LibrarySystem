export interface Usuario {
  id: string,
  nombre: string,
  apellido: string,
  email: string,
  password: string,
  carrito: string[],
  favoritos: string[],
  rol: string
}   