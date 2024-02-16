import { Component } from '@angular/core';
import { Venta } from 'src/app/interfaces/plantillaVenta';
import { VentasService } from 'src/app/service/ventas.service';
import { FormBuilder } from '@angular/forms';
import { APIService } from 'src/app/service/api.service';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})

export class VentasComponent {
  listaVentas: Venta[] = [];


  constructor(private vService: VentasService, private apiService: APIService){
    this.getVentas();
  }

  getVentas() {
    this.vService.getVentas().subscribe((ventas) => {
      this.listaVentas = ventas;
    })
  }

  cambiarEstadoVenta(idVenta: string, nuevoEstado: string) {
    this.vService.updateVenta(idVenta, nuevoEstado).subscribe(() => {
      const indexVenta = this.listaVentas.findIndex((v) => v.idVenta === idVenta);
      if (nuevoEstado === 'CONFIRMADA') {
        this.listaVentas[indexVenta].estado = 'CONFIRMADA';
      } else {
        this.listaVentas[indexVenta].estado = 'RECHAZADA';
      }
      this.actualizarLibrosPorVenta(idVenta, nuevoEstado === 'CONFIRMADA');
    });
  }
  
  actualizarLibrosPorVenta(idVenta: string, confirmada: boolean) {
    this.vService.getLibrosPorVenta(idVenta).subscribe((librosVendidos) => {
      const idsLibros = librosVendidos.map((libroVendido: { idLibro: string; }) => libroVendido.idLibro);
  
      this.obtenerLibros(idsLibros).subscribe(libros => {
        for (let i = 0; i < libros.length; i++) {
          if (confirmada) {
            this.apiService.updateCantV(libros[i].idLibro, (libros[i].cantVentas + 1)).subscribe();
          } else {
            this.apiService.updateStockLibro(libros[i].idLibro, (libros[i].stock + 1)).subscribe();
          }
        }
        alert('Estado cambiado correctamente');
      });
    });
  }

  obtenerLibros(idsLibros: string[]): Observable<Libro[]> {
    const observables: Observable<Libro>[] = idsLibros.map(idLibro => this.apiService.getLibro(idLibro));
    return forkJoin(observables);
  }

  yaConfirmada(idVenta: string){
    const indexVenta = this.listaVentas.findIndex((v) => v.idVenta === idVenta);

    if(this.listaVentas[indexVenta].estado == 'CONFIRMADA'){
      return true; //Confirmada
    }else{
      return false; //Pendiente
    }
  }

  yaRechazada(idVenta: string){
    const indexVenta = this.listaVentas.findIndex((v) => v.idVenta === idVenta);

    if(this.listaVentas[indexVenta].estado == 'RECHAZADA'){
      return true; //Rechazada
    }else{
      return false; //Pendiente
    }
  }
}
