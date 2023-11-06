import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
import { Usuario } from 'src/app/interfaces/plantillaUsuario';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { CarritoService } from 'src/app/service/carrito.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carritoActual: Libro[] | null;

  constructor(private apiService: APIService, private cService: CarritoService){
    this.carritoActual = cService.getCarritoActual();
  }
}
