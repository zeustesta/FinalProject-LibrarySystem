import { Component } from '@angular/core';
import { Venta } from 'src/app/interfaces/plantillaVenta';
import { VentasService } from 'src/app/service/ventas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoVenta } from 'src/app/utils/enum';
import { APIService } from 'src/app/service/api.service';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { LibroDetalleComponent } from '../libro-detalle/libro-detalle.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  listaVentas: Venta[] = [];

  constructor(private vService: VentasService, private apiService: APIService, private fb: FormBuilder){
    this.getVentas();
  }

  getVentas() {
    this.vService.getVentas().subscribe((ventas) => {
      this.listaVentas = ventas;
    })
  }

  cambiarEstadoVenta(idVenta: string, nuevoEstado: string) {
    if (nuevoEstado === 'Confirmada') {
      this.vService.updateVenta(idVenta, EstadoVenta.CONFIRMADA).subscribe(() => {
        this.vService.getLibrosPorVenta(idVenta).subscribe((librosVendidos) => {
          const libros = this.obtenerLibros(librosVendidos);
          for (let i = 0; libros.length < i; i++) {
            this.apiService.updateCantV(libros[i].idLibro, (libros[i].cantVentas + 1)).subscribe();
          };
          alert('Estado cambiado correctamente');
        });
      });
    } else {
      this.vService.updateVenta(idVenta, EstadoVenta.RECHAZADA).subscribe(() => {
        this.vService.getLibrosPorVenta(idVenta).subscribe((librosVendidos) => {
          const libros = this.obtenerLibros(librosVendidos);
          for (let i = 0; libros.length < i; i++) {
            this.apiService.updateStockLibro(libros[i].idLibro, (libros[i].stock - 1)).subscribe();
          };
          alert('Estado cambiado correctamente');
        });
      });
    } 
  }

  obtenerLibros(idsLibros: string[]) {
    const arrayLibros: Libro[] = []; 
    for (let i = 0; idsLibros.length < i; i++) {
      this.apiService.getLibro(idsLibros[i]).subscribe((libro) => {
        arrayLibros.push(libro);
      })
    }
    return arrayLibros;
  }

  yaConfirmada(idVenta: string){
    const indexVenta = this.listaVentas.findIndex((v) => v.idVenta === idVenta);

    if(this.listaVentas[indexVenta].estado == 'Confirmada'){
      return true; //Confirmada
    }else{
      return false; //Pendiente
    }
  }

  yaRechazada(idVenta: string){
    const indexVenta = this.listaVentas.findIndex((v) => v.idVenta === idVenta);

    if(this.listaVentas[indexVenta].estado == 'Rechazada'){
      return true; //Rechazada
    }else{
      return false; //Pendiente
    }
  }
}
