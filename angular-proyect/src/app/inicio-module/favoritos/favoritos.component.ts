import { Component } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { CartFavsService } from 'src/app/service/cart-favs.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  arrayTitulosFavs: string[] | null = null;

  constructor(private uService: UsuariosService, private cfService: CartFavsService, private aService: APIService){
    if(this.uService.obtenerUsuarioActual() !== null){
      this.arrayTitulosFavs = this.generarArregloTitulos();
    }
  }

  isLoggedIn(){
    return this.uService.estaLogueado();
  }

  generarArregloTitulos(){
    let arrayIds = this.cfService.getFavsActual();
    let arrayTitulos: string[] | null = new Array;

    if(arrayIds !== null){
      for(let i = 0; i < arrayIds.length; i++){
        let libro = this.aService.buscarPorId(arrayIds[i]);
        if(libro !== null){
          arrayTitulos.push(libro.titulo);
        }
      }
    }
    return arrayTitulos;
  }
}
