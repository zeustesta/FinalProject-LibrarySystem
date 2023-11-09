import { Component, OnInit } from '@angular/core';
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

export class FiltroComponent implements OnInit {
  generoSeleccionado: string | undefined;
  librosFiltrados: Libro[] = [];

  constructor(
    private route: ActivatedRoute,
    private libroService: APIService,
    private uService: UsuariosService, 
    private cService: CartFavsService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) =>{
     const generoParam = params.get('genero');
     if(generoParam !== null){
      this.librosFiltrados= this.libroService.filtrarLibrosPorGenero(generoParam);
     } else{
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

  verInformacionDetallada(id: number){
    this.router.navigate([`/inicio/libro_detalle/${id}`]);
  }
}
