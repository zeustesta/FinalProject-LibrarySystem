import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/libro';
import { APIService } from '../../service/api.service';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})

export class ListaLibrosComponent {
  listaLibros: Libro[] = [];
  libroSeleccionado: Libro;

  constructor(private apiService: APIService){
    this.libroSeleccionado=null;
  };

  ngOnInit(): void {
    this.bajarLibros();
  }

  bajarLibros(){
    this.apiService.getData().subscribe(data => {
      const results = data.results;
      for(let i = 0; i < results.length; i++){
        this.cargarLibro(results[i].id, results[i].title, results[i].authors, results[i].formats["image/jpeg"]);
      }
    })
  }

  cargarLibro(idLibro: number, titulo: string, autor: string[], portada: string){
    const aux: Libro = {
      idLibro: idLibro,
      titulo: titulo,
      genero: this.generoRandom(),
      autor: autor,
      stock: Math.floor(Math.random() * (15 - 3 + 1)) + 3,
      precio: Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000,
      portada: portada
    }
    console.log(aux);
    this.listaLibros.push(aux);
  }

  

  generoRandom(){
    const generos = ['Horror', 'Fantasía', 'Ciencia Ficción', 'Drama', 'Suspenso', 'Aventura', 'Cristiano', 'Policial', 'Paranormal', 'Poesía'];
    return generos[Math.floor(Math.random() * (10 - 1 + 1))];
  }
}
