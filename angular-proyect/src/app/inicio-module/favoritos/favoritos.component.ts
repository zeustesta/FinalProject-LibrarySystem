import { Component } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { FavoritosService } from 'src/app/service/favoritos.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  favoritosUsuario = new Map();
  keyArray: string[] = []; 
  idActual; 

  constructor(private uService: UsuariosService, private fService: FavoritosService){
    this.idActual = this.uService.obtenerUsuarioActual()?.id;
    if(this.idActual){
      const indexUsuarioActual = this.uService.obtenerIndex(this.idActual);
      if(indexUsuarioActual){
        this.favoritosUsuario = this.uService.listaUsuarios[indexUsuarioActual].favoritos;
        this.keyArray = Array.from(this.favoritosUsuario.keys());
      }
    }
  }

  
}
