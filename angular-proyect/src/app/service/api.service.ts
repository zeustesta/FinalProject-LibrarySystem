import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/plantillaLibro';

@Injectable({
  providedIn: 'root'
})

export class APIService implements OnInit {
  listaLibros: Libro[] = [];
  private urlApi = 'https://gutendex.com/books/?page=4';

  constructor(private http: HttpClient) {
    this.bajarLibros();
   }

  ngOnInit(): void {
    
  }

  public getData(): Observable<any> {
    return this.http.get<any>(this.urlApi);
  }

  retornarLibros(){
    return this.listaLibros;
  }

  bajarLibros(){
    this.getData().subscribe(data => {
      const results = data.results;
      for(let i = 0; i < results.length; i++){
        console.log(results[i].authors.name);
        this.cargarLibro(results[i].id, results[i].title, results[i].authors.name, results[i].formats["image/jpeg"]);
      }
    })
  }

  cargarLibro(idLibro: number, titulo: string, autor: string, portada: string){
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
    const generos = ['Horror', 'Fantasía', 'Ciencia Ficción', 'Drama', 'Suspenso', 'Aventura', 'Policial', 'Paranormal', 'Poesía'];
    return generos[Math.floor(Math.random() * (9 - 1 + 1))];
  }
}
