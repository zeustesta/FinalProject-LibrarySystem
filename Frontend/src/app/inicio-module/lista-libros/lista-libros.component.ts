import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})

export class ListaLibrosComponent implements OnInit {
  loading: boolean = false;
  listaLibros: Libro[] = [];

  constructor(private aService: APIService, private cService: ClienteService, private router: Router, private aRouter: ActivatedRoute){
  }

  ngOnInit(): void {
    this.getListaLibros();
  }

  getListaLibros() {
    this.loading = true;
    this.aRouter.paramMap.subscribe((params) =>{
      const tituloParam = params.get('titulo');
      if (tituloParam) {
       this.aService.filtrarPorBusqueda(tituloParam).subscribe((data) => {
        if (data) {
          this.listaLibros = data;
        } else {
          alert("No hay libros con ese titulo");
        }
        setTimeout(() => {
          this.loading = false;
        }, 800)
       })
      } else {
        this.aService.getLibros().subscribe((data: Libro[]) => {
          this.listaLibros = data;
          setTimeout(() => {
            this.loading = false;
          }, 800)        
        })
      }
    });
  }

  addToCart(idLibro: string) {
    this.cService.addToCart(idLibro).subscribe()
  }

  verInformacionDetallada(id: string) {
    this.router.navigate([`/inicio/libro_detalle/${id}`]);
  }
}
