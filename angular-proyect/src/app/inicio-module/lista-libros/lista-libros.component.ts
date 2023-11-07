import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})

export class ListaLibrosComponent implements OnInit {
  listaLibros: Libro[] = [];

  constructor(private apiService: APIService, private uService: UsuariosService, private cService: CarritoService, private router: Router){
  }

  ngOnInit(): void {
    this.listaLibros = this.apiService.retornarLibros();
  }

  addToCart(libro:Libro){
    if(this.uService.obtenerUsuarioActual() !== null && libro !== null){
      this.cService.agregarAlCarrito(libro);
      alert('Libro añadido al carrito!');
    }else{
      alert('Debe estar logueado');
    }
  }

  verInformacionDetallada(id: number){
    this.router.navigate([`/inicio/libro_detalle/${id}`]);
  }
}
