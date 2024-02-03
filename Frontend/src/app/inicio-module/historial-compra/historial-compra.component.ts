import { Component } from '@angular/core';
import { Venta } from 'src/app/interfaces/plantillaVenta';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.component.html',
  styleUrls: ['./historial-compra.component.css']
})
export class HistorialCompraComponent {
  historial: Venta [] = [];

  constructor(private uService: UsuariosService){}

  ngOnInit(): void {
    this.getHistorial();
  }

  getHistorial() {
    const actual = this.uService.obtenerUsuarioActual();

    this.uService.getHistorial(actual!).subscribe((data) => {
      console.log(data['LibrosVendidos'])
    });
  }
}
