import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/plantillaLibro';
import { environment } from 'src/enviroments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  listaLibros: Libro[] = [];
  private appUrl: string; 
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.apiUrl;
    this.apiUrl = 'api/libros/';
  }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.appUrl}${this.apiUrl}`);
  }

  getLibro(idLibro: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.appUrl}${this.apiUrl}${idLibro}`)
  }

  updateLibro(idLibro: string, libro: Libro): Observable<void> {
    return this.http.put<void>(`${this.appUrl}${this.apiUrl}${idLibro}`, libro);
  }

  filtrarLibrosPorGenero(genero: string) {
    return this.listaLibros.filter(libro => libro.genero === genero);
  }

  retornarPrecio(idLibro: string) {
    this.getLibro(idLibro).subscribe((libro) => {
      return libro.precio;
    })
  }

  getTop5(listaTop:Libro[]) {
    const ventasOrdenadas = listaTop.sort((a,b) => b.cantVenta - a.cantVenta);
    console.log(ventasOrdenadas);
    const top5Ventas = ventasOrdenadas.slice(0,5);
    
    return top5Ventas;
  }
}

