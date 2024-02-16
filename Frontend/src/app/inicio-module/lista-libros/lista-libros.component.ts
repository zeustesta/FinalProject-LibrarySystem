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
  currentPage: number= 1;
  itemsPerPage: number= 10; 
  allLibros: Libro[] = [];
  listaLibros: Libro[] = [];

  constructor(private aService: APIService, private uService: UsuariosService, private router: Router, private aRouter: ActivatedRoute) {}

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
          this.allLibros = data;
          this.currentPage = 1;
          this.listaLibros = this.paginateLibros(this.allLibros, this.currentPage);
        } else {
          alert("No hay libros con ese titulo");
        }
        setTimeout(() => {
          this.loading = false;
        }, 800)
       })
      } else {
        this.aService.getLibros().subscribe((data: Libro[]) => {
          this.allLibros = data;
          this.currentPage = 1;
          this.listaLibros = this.paginateLibros(this.allLibros, this.currentPage);
          setTimeout(() => {
            this.loading = false;
          }, 800)        
        })
      }
    });
  }

  addToCart(idLibro: string) {
    this.cService.addLibroToCart(idLibro).subscribe();
  }

  verInformacionDetallada(id: string) {
    this.router.navigate([`/inicio/libro_detalle/${id}`]);
  }

  paginateLibros(libros: Libro[], page: number): Libro[] {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return libros.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.listaLibros = this.paginateLibros(this.allLibros, this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.allLibros.length) {
      this.currentPage++;
      this.listaLibros = this.paginateLibros(this.allLibros, this.currentPage);
    }
  }
}
