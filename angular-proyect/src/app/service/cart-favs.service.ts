import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../interfaces/plantillaUsuario';
import { Libro } from '../interfaces/plantillaLibro';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartFavsService {
  constructor(private uService: UsuariosService, private apiService: APIService) {}

  agregarAlCarrito(libro: Libro){
    const usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      let indexUsuarioActual = this.uService.listaUsuarios.findIndex((u) => u.id == usuario.id);
      this.uService.listaUsuarios[indexUsuarioActual].carrito.push(libro);
      let indexLibro = this.apiService.listaLibros.findIndex((L) => L.idLibro === libro.idLibro);
      this.apiService.listaLibros[indexLibro].stock = this.apiService.listaLibros[indexLibro].stock - 1;
      this.uService.actualizarUsuarios();
    }
  }

  eliminarDeCarrito(idLibro: number){
    const usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      const indexUsuarioActual = this.uService.listaUsuarios.findIndex((u) => u.id == usuario.id);
      const indexLibroCarrito = this.uService.listaUsuarios[indexUsuarioActual].carrito.findIndex((L) => L.idLibro === idLibro);
      this.uService.listaUsuarios[indexUsuarioActual].carrito.splice(indexLibroCarrito, 1);
      let indexLibro = this.apiService.listaLibros.findIndex((L) => L.idLibro === idLibro);
      this.apiService.listaLibros[indexLibro].stock = this.apiService.listaLibros[indexLibro].stock + 1;
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

  eliminarDeFavs(idFavorito: number){
    const usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      const indexUsuarioActual = this.uService.listaUsuarios.findIndex((u) => u.id == usuario.id);
      const indexLibro = this.uService.listaUsuarios[indexUsuarioActual].favoritos.findIndex((idLibro) => idLibro === idFavorito);
      this.uService.listaUsuarios[indexUsuarioActual].favoritos.splice(indexLibro, 1);
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
