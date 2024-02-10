import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../../interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css'],
})

export class LibroDetalleComponent implements OnInit {
  libro!: Libro;

  constructor(private route: ActivatedRoute, private apiService: APIService, private cService: ClienteService) {}

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
    this.cService.addLibroToCart(idLibro).subscribe((agregado) => {
      if (agregado) {
        this.libro.stock = this.libro.stock - 1; 
      }
    })
  }
  

  addToFavs(idLibro: string) {
    const actual = this.cService.obtenerUsuarioActual();

    this.cService.buscarEnFavs(idLibro).subscribe((existe) => {
      if (existe) {
        alert('El libro ya existe en favoritos');
      } else {
        this.apiService.getLibro(idLibro).subscribe((libro) => {
          this.cService.postFav(actual!, idLibro).subscribe(() => {
            alert('Libro agregado a favoritos');
          });
        });
      }
    });
  }
}