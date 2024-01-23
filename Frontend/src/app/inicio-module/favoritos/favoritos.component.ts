import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
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
    let arrayTitulos: string[] = new Array;

    if(arrayIds !== null){
      for(let i = 0; i < arrayIds.length; i++){
        let libro;
        this.aService.getLibro(arrayIds[i]).subscribe((libro) => {
          if(libro !== null){
            arrayTitulos.push(libro.titulo);
          }
        }) 
      }
    }
    return arrayTitulos;
  }

  eliminarDeFavs(titulo: string){
    let libro = this.aService.listaLibros.find((l) => l.titulo === titulo);

    if(libro){
      this.cfService.eliminarDeFavs(libro.idLibro);
      this.arrayTitulosFavs = this.generarArregloTitulos();
      alert('Libro eliminado de favoritos');
    }
  }

  agregarACarrito(titulo: string){
    let libro = this.aService.listaLibros.find((l) => l.titulo === titulo);

    if(libro){
      this.cfService.agregarAlCarrito(libro);
      alert('Libro agregado al carrito');
    }
  }
}
