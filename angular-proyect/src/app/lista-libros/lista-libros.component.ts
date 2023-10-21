import { Component } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { APIService } from '../service/api.service';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})

export class ListaLibrosComponent {
  listaLibros: Libro[] = [];

  constructor(private apiService: APIService){};

  ngOnInit(): void {
    this.bajarLibros();
  }

  bajarLibros(){
    this.apiService.getData().subscribe(data => {
      const results = data.results;
      //console.log(results);
      for(let i = 0; i < results.length; i++){
        this.cargarLibro(results[i].id, results[i].title, results[i].authors, results[i].bookshelves);
      }
    })
    console.log('Lista:' + this.listaLibros);
  }

  cargarLibro(idLibro: number, titulo: string, autor: string[], genero: string){
    const aux: Libro = {
      idLibro: idLibro,
      titulo: titulo,
      genero: genero,
      autor: autor,
      stock: Math.floor(Math.random() * (15 - 3 + 1)) + 3,
      precio: Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000
    }
    //console.log(aux);
    this.listaLibros.push(aux);
  }
}
