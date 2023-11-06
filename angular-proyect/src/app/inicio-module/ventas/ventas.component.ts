import { Component } from '@angular/core';
import { Venta } from 'src/app/interfaces/plantillaVenta';
import { VentasService } from 'src/app/service/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  listaVentas: Venta[] = [];

  constructor(private vService: VentasService){
    this.listaVentas = this.vService.getVentas();
  }
}
