import { Component } from '@angular/core';
import { Venta } from 'src/app/interfaces/plantillaVenta';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.component.html',
  styleUrls: ['./historial-compra.component.css']
})
export class HistorialCompraComponent {
  ventas: Venta [] = [];

  constructor(private usuarioService:UsuariosService){

  }

  getHistorial(){
    if(this.usuarioService.obtenerUsuarioActual()){
      this.usuarioService.getHistorial(this.usuarioService.obtenerUsuarioActual()!).subscribe((data) => {
        console.log(data);
      });
    }
  }

}
