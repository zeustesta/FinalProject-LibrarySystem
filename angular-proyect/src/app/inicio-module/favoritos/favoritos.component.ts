import { Component } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  favoritosUsuario = new Map();

  constructor(private uService: UsuariosService){
    const idActual = this.uService.obtenerUsuarioActual()?.id;
    if(idActual){
      const indexUsuarioActual = this.uService.obtenerIndex(idActual);
      if(indexUsuarioActual)
        this.favoritosUsuario = this.uService.listaUsuarios[indexUsuarioActual].favoritos;
    }
  }

  crearLista(listaAgregar: string, idUsuario: string): boolean{
    const indexUsuarioActual = this.uService.obtenerIndex(idUsuario);

    if((indexUsuarioActual !== null) && (!this.existeLista(listaAgregar, idUsuario))){
      this.uService.listaUsuarios[indexUsuarioActual].favoritos.set(listaAgregar, []);
      this.uService.actualizarUsuarios();
      return true; //Lista agregada
    }else{
      return false; //No existe el usuario o la lista ya esta agregada
    }
  }

  existeLista(nombreLista: string, idUsuario: string): boolean{
    const indexUsuarioActual = this.uService.obtenerIndex(idUsuario);

    if(indexUsuarioActual !== null){
      if(this.uService.listaUsuarios[indexUsuarioActual].favoritos.has(nombreLista) === true){
        return true; //Existe la lista
      }
    }
    return false; //No existe la lista
  }

  borrarLista(listaBorrar: string, idUsuario: string): boolean{
    const indexUsuarioActual = this.uService.obtenerIndex(idUsuario);

    if((indexUsuarioActual !== null) && (this.existeLista(listaBorrar, idUsuario))){
      this.uService.listaUsuarios[indexUsuarioActual].favoritos.delete(listaBorrar);
      this.uService.actualizarUsuarios();
      return true; //Lista borrada
    }else{
      return false; //No existe el usuario o la lista no esta agregada
    }
  }

}
