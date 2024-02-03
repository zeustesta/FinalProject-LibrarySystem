import { Component } from '@angular/core';
import { Venta } from 'src/app/interfaces/plantillaVenta';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.component.html',
  styleUrls: ['./historial-compra.component.css']
})
export class HistorialCompraComponent {
  historial: any = [];

  constructor(private uService: UsuariosService){}

  ngOnInit(): void {
    this.getHistorial();
  }

  getHistorial() {
    const actual = this.uService.obtenerUsuarioActual();

    this.uService.getHistorial(actual!).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].LibrosVendidos.length; j++) {
          const compra = {
            idLibro: data[i].LibrosVendidos[j].LibrosVenta['idLibro'],
            titulo: data[i].LibrosVendidos[j].LibrosVenta['titulo'],
            autor: data[i].LibrosVendidos[j].LibrosVenta['autor'],
            precio: data[i].LibrosVendidos[j].LibrosVenta['precio'],
            fechaCompra: data[i]['fechaCompra'],
            estado: data[i]['estado']
          }
          this.historial.push(compra);
        }
      }
    });
  }
}
