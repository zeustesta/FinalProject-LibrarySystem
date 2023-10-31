import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/plantillaLibro';
import { Usuario } from '../interfaces/plantillaUsuario';
import { Carrito } from '../interfaces/plantillaCarrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  addToCarrito(usuario: Usuario, libro: Libro){
    usuario.carrito.push(libro);
  }

  getCarrito(usuario:Usuario){
    return usuario.carrito;
  }
}
