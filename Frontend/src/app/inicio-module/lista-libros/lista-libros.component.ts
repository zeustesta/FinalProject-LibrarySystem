import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})

export class ListaLibrosComponent implements OnInit {
  listaLibros: Libro[] = [];

  constructor(private apiService: APIService, private uService: UsuariosService, private router: Router,private aRouter: ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.getListaLibros();
  }

  getListaLibros() {
    this.apiService.getLibros().subscribe((data: Libro[]) => {
      this.listaLibros = data;
    })
  }

  addToCart(idLibro: string) {
    const actual = this.uService.obtenerUsuarioActual();

    if (!actual) {
      alert('Debe iniciar sesión primero');
      return;
    }

    this.uService.buscarEnCart(idLibro).subscribe((existe) => {
      if (existe) {
        alert('El libro ya existe en el carrito');
      } else {
        this.apiService.getLibro(idLibro).subscribe((libro) => {
          this.uService.postCart(actual, idLibro).subscribe(() => {
            this.apiService.updateStockLibro(idLibro, libro.stock - 1).subscribe(() => {
              alert('Libro agregado al carrito');
            });
          });
        });
      }
    });
  }

  verInformacionDetallada(id: string) {
    this.router.navigate([`/inicio/libro_detalle/${id}`]);
  }
}
