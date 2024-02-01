import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../../interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css'],
})

export class LibroDetalleComponent implements OnInit {
  libro!: Libro;

  constructor(private route: ActivatedRoute, private apiService: APIService, private uService: UsuariosService) {}

  ngOnInit(): void {
    this.getLibro();
  }

  getLibro() {
    this.route.paramMap.subscribe((params) =>{
      const idParam = params.get('idLibro');
      if (idParam !== null) {
        this.apiService.getLibro(idParam).subscribe((data) => {
          this.libro = data;
        });
      };
    });
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
            libro.stock = libro.stock - 1;
            this.apiService.updateLibro(idLibro, libro).subscribe(() => {
              alert('Libro agregado al carrito');
            });
          });
        });
      }
    });
  }

  addToFavs(idLibro: string) {
    const actual = this.uService.obtenerUsuarioActual();

    if (!actual) {
      alert('Debe iniciar sesión primero');
      return;
    }

    this.uService.buscarEnFavs(idLibro).subscribe((existe) => {
      if (existe) {
        alert('El libro ya existe en favoritos');
      } else {
        this.apiService.getLibro(idLibro).subscribe((libro) => {
          this.uService.postFav(actual, idLibro).subscribe(() => {
            alert('Libro agregado a favoritos');
          });
        });
      }
    });
  }
}