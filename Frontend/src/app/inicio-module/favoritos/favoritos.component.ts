import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  arrayFavs: Libro[] = [];

  constructor(private cService: ClienteService, private aService: APIService){
  this.getFavoritos();
  }

  getFavoritos() {
    const actual = this.cService.obtenerUsuarioActual();
    
    this.cService.getFavs(actual!).subscribe((favs) => {
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
    this.cService.deleteFav(this.cService.obtenerUsuarioActual()!, idLibro).subscribe();
    this.arrayFavs.splice(this.arrayFavs.findIndex(item => item.idLibro === idLibro), 1);
  }

  addToCart(idLibro: string) {
    this.cService.addLibroToCart(idLibro).subscribe();
  }
}
