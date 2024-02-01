import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { VentasService } from 'src/app/service/ventas.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { forkJoin } from 'rxjs';


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
      if(cart !== null){
        for(let i = 0; i < cart.length; i++){
          this.aService.getLibro(cart[i]['idLibro']).subscribe((data) => {
            let libro: Libro = data;
            if(libro !== null){
              this.arrayCarrito.push(libro);
            };
          }); 
        };
      };
    });
  }

  comprarCarrito() {
    const actual = this.uService.obtenerUsuarioActual();
  
    if (actual && this.arrayCarrito) {
      const idVenta = uuidv4();
      const arrayIds: string[] = this.arrayCarrito.map(item => item.idLibro);
  
      const arrayObservables = arrayIds.map(idLibro => this.aService.getLibro(idLibro));
  
      forkJoin(arrayObservables).subscribe((libros: Libro[]) => {
        const arrayValores: number[] = libros.map(libro => Number(libro.precio));
        let total = arrayValores.reduce((sum, precio) => sum + precio, 0);
  
        this.vService.postVenta(idVenta, actual, total).subscribe(() => {
          for (let i = 0; i < this.arrayCarrito.length; i++) {
            this.vService.postLibroVendido(idVenta, this.arrayCarrito[i].idLibro).subscribe();
          };
  
          alert('Carrito encargado exitosamente, será redirigido');
          this.uService.cleanCart(actual).subscribe();
          this.router.navigate([`/inicio/inicio`]);
        });
      });
    }
  }

  eliminarDeCarrito(idLibro: string){
    const actual = this.uService.obtenerUsuarioActual();

    if(actual){
      this.aService.getLibro(idLibro).subscribe((libro) => {
        this.uService.deleteCart(actual, idLibro).subscribe(() => {
          this.arrayCarrito.splice(this.arrayCarrito.findIndex((idLibro) => idLibro = idLibro), 1);
          this.aService.updateStockLibro(idLibro, libro.stock + 1).subscribe(() => {
            alert('Libro eliminado de carrito');          
          });
        });
      });
    }
  }
}
