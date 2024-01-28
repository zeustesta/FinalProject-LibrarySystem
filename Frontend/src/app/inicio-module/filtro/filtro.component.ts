import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
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

  addToCart(idLibro: string){
    const actual = this.uService.obtenerUsuarioActual();

    if(actual !== null){
      this.uService.postCart(actual, idLibro).subscribe();
      alert('Libro agregado correctamente');
    }else{
      alert('Debe iniciar sesion primero');
    }
  }

  verInformacionDetallada(id: string){
    this.router.navigate([`/inicio/libro_detalle/${id}`]);
  }
}
