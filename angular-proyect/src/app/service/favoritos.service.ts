import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private uService: UsuariosService) {

  }

  crearLista(listaAgregar: string, idUsuario: string): boolean{
    let usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      let indexUsuarioActual = this.uService.obtenerIndex(usuario.id);
      this.uService.listaUsuarios[indexUsuarioActual].favoritos.set(listaAgregar, []);
      this.uService.actualizarUsuarios();
      return true;
    }else{
      return false;
    }
  }

  agregarALista(idLibro: number, idUsuario: string, key: string): boolean{
    let usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      let indexUsuarioActual = this.uService.obtenerIndex(usuario.id);
      this.uService.listaUsuarios[indexUsuarioActual].favoritos.get(key)?.push(idLibro);
      this.uService.actualizarUsuarios();
      return true;
    }else{
      return false;
    }
  }

  borrarLista(listaBorrar: string, idUsuario: string): boolean{
    let usuario = this.uService.obtenerUsuarioActual();

    if (usuario) {
      let indexUsuarioActual = this.uService.obtenerIndex(usuario.id);
      this.uService.listaUsuarios[indexUsuarioActual].favoritos.set(listaBorrar, []);
      this.uService.actualizarUsuarios();
      return true;
    }else{
      return false;
    }
  }

  existeLista(nombreLista: string, idUsuario: string): boolean{
    
    let indexUsuarioActual = this.uService.obtenerIndex(idUsuario);

    if(indexUsuarioActual !== null){
      if(this.uService.listaUsuarios[indexUsuarioActual].favoritos.has(nombreLista) === true){
        return true; //Existe la lista
      }
    }
    return false; //No existe la lista
  }
}
