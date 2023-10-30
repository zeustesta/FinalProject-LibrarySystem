import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/libro';
import { APIService } from 'src/app/service/api.service';
import { Usuario } from 'src/app/interfaces/usuario';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  constructor(private apiService: APIService){};
}
