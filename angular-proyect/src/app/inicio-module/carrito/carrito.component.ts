import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
import { Usuario } from 'src/app/interfaces/plantillaUsuario';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { CartFavsService } from 'src/app/service/cart-favs.service';
import { VentasService } from 'src/app/service/ventas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carritoActual: Libro[] | null;
  usuarioActual: Usuario | null;

  constructor(private cService: CartFavsService, private vService: VentasService, private uService: UsuariosService, private router: Router){
    this.carritoActual = this.cService.getCarritoActual();
    this.usuarioActual = this.uService.obtenerUsuarioActual();
  }

  comprarCarrito(){
    if(this.usuarioActual != null && this.carritoActual != null){
      let idUsuarioActual;
      let arrayIds = new Array;
      for(let i = 0; i < this.carritoActual.length; i++){
        arrayIds.push(this.carritoActual[i].idLibro);
      }
      idUsuarioActual = this.usuarioActual.id;
      this.vService.agregarVenta(idUsuarioActual, arrayIds, new Date());
      this.carritoActual = [];
      this.cService.limpiarCarrito();
      alert('Carrito encargado exitosamente');
      this.router.navigate([`/inicio/inicio`]);
    }else{
      alert('Debe estar logueado!');
    }
  }
}
