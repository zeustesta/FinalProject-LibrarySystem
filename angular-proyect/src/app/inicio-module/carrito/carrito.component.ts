import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
import { Usuario } from 'src/app/interfaces/plantillaUsuario';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { VentasService } from 'src/app/service/ventas.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carritoActual: Libro[] | null;
  usuarioActual: Usuario | null;

  constructor(private aService: APIService, private cService: CarritoService, private vService: VentasService, private uService: UsuariosService){
    this.carritoActual = this.cService.getCarritoActual();
    this.usuarioActual = this.uService.obtenerUsuarioActual();
  }

  comprarCarrito(){
    let idUsuarioActual;
    let arrayIds = new Array;
    if(this.usuarioActual != null && this.carritoActual != null){
      for(let i = 0; i < this.carritoActual.length; i++){
        arrayIds.push(this.carritoActual[i].idLibro);
      }
      idUsuarioActual = this.usuarioActual.id;
      this.vService.agregarVenta(idUsuarioActual, arrayIds, new Date());
    }
    this.carritoActual = [];
    this.cService.limpiarCarrito();
  }
}
