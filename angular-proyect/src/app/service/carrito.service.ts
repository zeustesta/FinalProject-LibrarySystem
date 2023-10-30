import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { Usuario } from '../interfaces/usuario';
import { Carrito } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  addToCarrito(usuario:Usuario,libro:Libro){
    usuario.carrito.push(libro);
  }

  getCarrito(usuario:Usuario){
    return usuario.carrito;
  }
}
