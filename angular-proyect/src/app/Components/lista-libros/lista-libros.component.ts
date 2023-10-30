import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/libro';
import { APIService } from '../../service/api.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})

export class ListaLibrosComponent {
  listaLibros: Libro[] = [];

  constructor(private apiService: APIService){
    this.listaLibros = apiService.retornarLibros();
  }

  addToCart(libro:Libro){
    
  }
}
