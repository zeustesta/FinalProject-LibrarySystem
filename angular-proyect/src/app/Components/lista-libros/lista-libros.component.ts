import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { Usuario } from 'src/app/interfaces/plantillaUsuario';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})

export class ListaLibrosComponent implements OnInit {
  listaLibros: Libro[] = [];

  constructor(private apiService: APIService, private uS: UsuariosService){
    
  }
  ngOnInit(): void {
    this.listaLibros = this.apiService.retornarLibros();
  }

  addToCart(libro:Libro){
    console.log("Hola");
    (this.uS.obtenerUsuarioActual() == null) ? alert("Debe estar logueado!") : this.uS.agregarAlCarrito(libro);
    console.log(this.uS.obtenerUsuarioActual());
  }
}
