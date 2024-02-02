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
  user : string | null = null;

  constructor(private usuarioService:UsuariosService){
    this.getHistorial();
  }

  ngOnInit(): void {
    this.user = this.usuarioService.obtenerUsuarioActual();
  }

  getHistorial() {
    console.log(this.user);

    if (this.user !== null) {
      this.usuarioService.getHistorial(this.user).subscribe(
        (data) => {
          console.log(data);
          console.log("SE METE");
        },
        (error) => {
          console.error('Error al obtener historial:', error);
          // Manejar el error según sea necesario
        }
      );
    }
  }
}
