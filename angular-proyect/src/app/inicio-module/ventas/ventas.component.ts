import { Component } from '@angular/core';
import { Venta } from 'src/app/interfaces/plantillaVenta';
import { VentasService } from 'src/app/service/ventas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  listaVentas: Venta[] = [];
  ventaForm: FormGroup;

  constructor(private vService: VentasService, private fb: FormBuilder){
    this.listaVentas = this.vService.getVentas();
    this.ventaForm = this.fb.group({
      fecha: ['', Validators.required],
      total: [0, [Validators.min(0), Validators.required]]
    })
  }

  confirmarCompra(idVenta: string){
    this.vService.confirmarCompra(idVenta);
  }

  rechazarCompra(idVenta: string){
    this.vService.rechazarCompra(idVenta);
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
