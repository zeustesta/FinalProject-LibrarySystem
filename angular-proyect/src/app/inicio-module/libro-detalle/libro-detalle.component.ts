import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../../interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css'],
})

export class LibroDetalleComponent implements OnInit {
  titulo!: string;
  genero!: string;
  autor!: string;
  precio!: number;
  portada!: string;
  stock!: number;
  listaLibros: Libro[] = []; 

  constructor(
    private route: ActivatedRoute,
    private apiService: APIService
  ) {

  }

  ngOnInit() {
    let id = this.route.snapshot.params['id_libro'];

    this.listaLibros = this.apiService.retornarLibros();
    let libros = this.listaLibros; //prueba rara por si el error se daba al acceder desde el this.listaLibros 

    let libro = libros.find(l => l.idLibro === id);
    
    if(libro){ //datos para usar en el html, no llamo a ninguno todavia porque tira error porque contienen undefined
      this.titulo = libro.titulo;
      console.log(this.titulo);
      this.genero = libro.genero;
      this.autor = libro.autor;
      this.precio = libro.precio;
      this.portada = libro.portada;
      this.stock = libro.stock;
    }
  }
}