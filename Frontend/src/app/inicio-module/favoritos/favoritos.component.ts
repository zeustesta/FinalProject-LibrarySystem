import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  arrayFavs: Libro[] = [];

  constructor(private uService: UsuariosService, private aService: APIService){
    this.getFavoritos();
  }

  getFavoritos() {
    const actual = this.uService.obtenerUsuarioActual();
    
    this.uService.getFavs(actual!).subscribe((favs) => {
      let arrayIds = favs;
      if(arrayIds !== null){
        for(let i = 0; i < arrayIds.length; i++){
          this.aService.getLibro(arrayIds[i]['idLibro']).subscribe((data) => {
            let libro: Libro = data;
            if(libro !== null){
              this.arrayFavs.push(libro);
            }
          }) 
        }
      }
    });
  }

  eliminarDeFavs(idLibro: string){
    this.uService.deleteFav(this.uService.obtenerUsuarioActual()!, idLibro).subscribe();
    this.arrayFavs.splice(this.arrayFavs.findIndex(item => item.idLibro === idLibro), 1);
  }

  agregarACarrito(idLibro: string){
    this.uService.postFav(this.uService.obtenerUsuarioActual()!, idLibro).subscribe();
  }
}
