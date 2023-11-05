import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/plantillaLibro';
import { UsuariosService } from './usuarios.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private uService: UsuariosService) {

  }

  agregarAlCarrito(libro: Libro){
    const usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      const indexUsuarioActual = this.uService.listaUsuarios.findIndex((u) => u.id == usuario.id);
      this.uService.listaUsuarios[indexUsuarioActual].carrito.push(libro);
      this.uService.actualizarUsuarios();
    }
  }
}
