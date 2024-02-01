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
    let existe = this.uService.buscarEnCart(idLibro);

    if (actual) {
      if (existe !== true) {
        this.apiService.getLibro(idLibro).subscribe((data) => {
          this.uService.postCart(actual, idLibro).subscribe();
          this.apiService.updateStock(idLibro, (data.stock - 1)).subscribe();
        });        
        alert('Libro agregado al carrito');
      } else {
        alert('El libro ya existe en el carrito');
      }
    } else {
      alert('Debe iniciar sesion primero');
    }
  }

  addToFavs(idLibro: string) {
    const actual = this.uService.obtenerUsuarioActual();
    let existe = this.uService.buscarEnFavs(idLibro);

    if (actual) {
      if (existe !== true) {
        this.uService.postFav(actual, idLibro).subscribe();
        alert('Libro agregado correctamente');
      } else {
        alert('El libro ya existe en favoritos');
      }
    } else {
      alert('Debe iniciar sesion primero');
    }
  }
}