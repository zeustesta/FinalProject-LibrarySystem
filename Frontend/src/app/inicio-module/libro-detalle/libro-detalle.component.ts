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

    if (actual) {
      this.cService.buscarEnFavs(idLibro, actual).subscribe((existe) => {
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
    } else {
      alert('Debe iniciar sesion');
    }
  }

  updateStock(idLibro: string) {
    const campo: HTMLInputElement = document.getElementById("newStock") as HTMLInputElement;  
    const newStock = Number(campo.value);
    if (newStock < 0) {
      alert('Solo valores positivos');
    } else {
      this.libro.stock = newStock;
      this.apiService.updateStockLibro(idLibro, Number(campo.value)).subscribe();
    }
  }

  isAdmin() {
    return this.cService.rolActual;
  }
}