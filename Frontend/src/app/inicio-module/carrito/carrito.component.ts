import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
import { Usuario } from 'src/app/interfaces/plantillaUsuario';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { VentasService } from 'src/app/service/ventas.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  arrayCarrito: Libro[] = [];

  constructor(private aService: APIService, private vService: VentasService, private uService: UsuariosService, private router: Router){
    this.getCarrito();
  }

  getCarrito() {
    const actual = this.uService.obtenerUsuarioActual();
    
    this.uService.getCart(actual!).subscribe((cart) => {
      let arrayIds = cart;
      if(arrayIds !== null){
        for(let i = 0; i < arrayIds.length; i++){
          this.aService.getLibro(arrayIds[i]['idLibro']).subscribe((data) => {
            let libro: Libro = data;
            if(libro !== null){
              this.arrayCarrito.push(libro);
            }
          }) 
        }
      }
    });
  }

  comprarCarrito(){
    const actual = this.uService.obtenerUsuarioActual();

    if (actual && this.arrayCarrito) {
      const idVenta = uuidv4();
      let total = 0;

      for(let i = 0; i < this.arrayCarrito.length; i++){
        total = total + this.arrayCarrito[i].precio;
        this.vService.postLibroVendido(idVenta, this.arrayCarrito[i].idLibro);
      };
      this.vService.postVenta(idVenta, actual, total).subscribe();
      this.uService.cleanCart(actual).subscribe();
      this.router.navigate([`/inicio/inicio`]);
    };
  }

  eliminarDeCarrito(idLibro: string){
    const actual = this.uService.obtenerUsuarioActual();

    if(actual){
      this.uService.deleteCart(actual, idLibro).subscribe();
      alert('Libro eliminado de carrito');
    }
  }
}
