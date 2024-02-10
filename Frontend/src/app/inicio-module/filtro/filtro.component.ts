import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})

export class FiltroComponent{
  librosFiltrados: Libro[] = [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private aService: APIService,
    private cService: ClienteService, 
    private router: Router
  ) { this.filtrarLibros(); }

  filtrarLibros() {
    this.loading = true;
    this.route.paramMap.subscribe((params) =>{
      const generoParam = params.get('genero');
      if (generoParam) {
        this.aService.filtrarLibrosPorGenero(generoParam).subscribe((data) => {
          this.librosFiltrados = data;
          setTimeout(() => {
            this.loading = false;
          }, 800);
        });
      } else {
       alert("No hay libros de ese genero");
      };
    });
  }

  addToCart(idLibro: string){
    this.cService.addLibroToCart(idLibro).subscribe();
  }

  verInformacionDetallada(id: string){
    this.router.navigate([`/inicio/libro_detalle/${id}`]);
  }
}
