import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { CartFavsService } from 'src/app/service/cart-favs.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})

export class ListaLibrosComponent implements OnInit {
  listaLibros: Libro[] = [];

  constructor(private apiService: APIService, private uService: UsuariosService, private cService: CartFavsService, private router: Router,private aRouter: ActivatedRoute){
  }

  ngOnInit(): void {
    this.aRouter.paramMap.subscribe((params) => {
      const titulo = params.get('titulo');
      if(titulo === null){
        this.listaLibros= this.apiService.retornarLibros();
      } else{
        const auxListaLibros= this.apiService.retornarLibros();
        this.listaLibros = auxListaLibros.filter(libro => libro.titulo.toLowerCase().includes(titulo.toLowerCase()));
      }
      console.log(this.listaLibros);
    })
  }

  addToCart(libro:Libro){
    if(this.uService.obtenerUsuarioActual() !== null && libro !== null){
      this.cService.agregarAlCarrito(libro);
      alert('Libro añadido al carrito!');
    }else{
      alert('Debe iniciar sesión primero!');
    }
  }

  verInformacionDetallada(id: number){
    this.router.navigate([`/inicio/libro_detalle/${id}`]);
  }
}
