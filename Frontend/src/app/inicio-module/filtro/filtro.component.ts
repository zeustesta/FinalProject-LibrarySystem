import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
import { CartFavsService } from 'src/app/service/cart-favs.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})

export class FiltroComponent{
  generoSeleccionado: string | undefined;
  librosFiltrados: Libro[] = [];

  constructor(
    private route: ActivatedRoute,
    private libroService: APIService,
    private uService: UsuariosService, 
    private cService: CartFavsService, 
    private router: Router
  ) { this.filtrarLibros(); }

  filtrarLibros() {
    this.route.paramMap.subscribe((params) =>{
      const generoParam = params.get('genero');
      if (generoParam) {
       this.libroService.filtrarLibrosPorGenero(generoParam).subscribe((data) => {
         this.librosFiltrados = data;
       })
      } else {
       alert("No hay libros de ese genero");
      }
    });
  }

  addToCart(libro:Libro){
    if(this.uService.obtenerUsuarioActual() !== null && libro !== null){
      this.cService.agregarAlCarrito(libro);
      alert('Libro añadido al carrito!');
    }else{
      alert('Debe estar logueado');
    }
  }

  verInformacionDetallada(id: string){
    this.router.navigate([`/inicio/libro_detalle/${id}`]);
  }
}
