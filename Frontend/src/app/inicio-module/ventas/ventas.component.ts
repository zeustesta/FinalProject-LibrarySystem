import { Component } from '@angular/core';
import { Venta } from 'src/app/interfaces/plantillaVenta';
import { VentasService } from 'src/app/service/ventas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoVenta } from 'src/app/utils/enum';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  listaVentas: Venta[] = [];

  constructor(private vService: VentasService, private fb: FormBuilder){
    this.vService.getVentas();
  }

  getVentas() {
    this.vService.getVentas().subscribe((ventas) => {
      this.listaVentas = ventas;
    })
  }

  cambiarEstadoVenta(idVenta: string, nuevoEstado: string) {
    if (nuevoEstado === 'Confirmada') {
      this.vService.updateVenta(idVenta, EstadoVenta.CONFIRMADA).subscribe();
    } else {
      this.vService.updateVenta(idVenta, EstadoVenta.RECHAZADA).subscribe();
    } 
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
