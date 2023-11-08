import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../interfaces/plantillaUsuario';
import { Libro } from '../interfaces/plantillaLibro';

@Injectable({
  providedIn: 'root'
})
export class CartFavsService {
  usuarioActual: Usuario | null = null;
  indexActual: number | null = null;

  constructor(private uService: UsuariosService) {
    if(this.uService.obtenerUsuarioActual() && this.uService.obtenerIndex(this.usuarioActual!.id)){
      this.usuarioActual = this.uService.obtenerUsuarioActual();
      this.indexActual = this.uService.obtenerIndex(this.usuarioActual!.id);  
    }
  }

  agregarAlCarrito(libro: Libro){
    if (this.usuarioActual && this.indexActual) {
      this.uService.listaUsuarios[this.indexActual].carrito.push(libro);
      this.uService.actualizarUsuarios();
    }
  }

  getCarritoActual(){
    if (this.usuarioActual && this.indexActual) {
      return this.uService.listaUsuarios[this.indexActual].carrito;
    }else{
      return null;
    }
  }

  limpiarCarrito(){
    if (this.usuarioActual && this.indexActual) {
      this.uService.listaUsuarios[this.indexActual].carrito = [];
      this.uService.actualizarUsuarios();
    }
  }

  agregarToFavs(idLibro: number){
    if (this.usuarioActual && this.indexActual) {
      this.uService.listaUsuarios[this.indexActual].favoritos = [];
      this.uService.actualizarUsuarios();
    }
  }

  eliminarDeFavs(idLibro: number){
    if(this.usuarioActual && this.indexActual){
      this.uService.listaUsuarios[this.indexActual].favoritos.splice(this.indexActual, 1);
      this.uService.actualizarUsuarios();
    }
  }

  limpiarFavs(){
    if(this.usuarioActual && this.indexActual){
      this.uService.listaUsuarios[this.indexActual].favoritos = [];
      this.uService.actualizarUsuarios();
    }
  }

  getFavsActual(){
    if(this.usuarioActual && this.indexActual){
      return this.uService.listaUsuarios[this.indexActual].favoritos;
    }else{
      return null;
    }
  }
}
