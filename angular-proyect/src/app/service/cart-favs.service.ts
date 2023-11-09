import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../interfaces/plantillaUsuario';
import { Libro } from '../interfaces/plantillaLibro';

@Injectable({
  providedIn: 'root'
})
export class CartFavsService {
  constructor(private uService: UsuariosService) {}

  agregarAlCarrito(libro: Libro){
    const usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      let indexUsuarioActual = this.uService.listaUsuarios.findIndex((u) => u.id == usuario.id);
      this.uService.listaUsuarios[indexUsuarioActual].carrito.push(libro);
      this.uService.actualizarUsuarios();
    }
  }

  getCarritoActual(){
    const usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      const indexUsuarioActual = this.uService.listaUsuarios.findIndex((u) => u.id == usuario.id);
      return this.uService.listaUsuarios[indexUsuarioActual].carrito;
    }else{
      return null;
    }
  }

  limpiarCarrito(){
    const usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      const indexUsuarioActual = this.uService.listaUsuarios.findIndex((u) => u.id == usuario.id);
      this.uService.listaUsuarios[indexUsuarioActual].carrito = [];
      this.uService.actualizarUsuarios();
    }
  }

  agregarToFavs(idLibro: number){
    const usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      const indexUsuarioActual = this.uService.listaUsuarios.findIndex((u) => u.id == usuario.id);
      this.uService.listaUsuarios[indexUsuarioActual].favoritos.push(idLibro);
      this.uService.actualizarUsuarios();
    }
  }

  limpiarFavs(){
    const usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      const indexUsuarioActual = this.uService.listaUsuarios.findIndex((u) => u.id == usuario.id);
      this.uService.listaUsuarios[indexUsuarioActual].favoritos = [];
      this.uService.actualizarUsuarios();
    }
  }

  getFavsActual(){
    const usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      const indexUsuarioActual = this.uService.listaUsuarios.findIndex((u) => u.id == usuario.id);
      return this.uService.listaUsuarios[indexUsuarioActual].favoritos;
    }else{
      return null;
    }
  }
}
