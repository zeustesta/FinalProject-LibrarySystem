import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    this.apiUrl = '/api/libros';
  }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.appUrl}${this.apiUrl}/getLibros`);
  }

  getLibro(idLibro: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.appUrl}${this.apiUrl}/getLibro/${idLibro}`)
  }

  updateLibro(idLibro: string, libro: Libro): Observable<void> {
    return this.http.put<void>(`${this.appUrl}${this.apiUrl}/updateLibro/${idLibro}`, libro);
  }

  filtrarLibrosPorGenero(generoDeseado: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.appUrl}${this.apiUrl}/getLibros`).pipe(
      map((libros: Libro[]) => libros.filter(libro => libro.genero === generoDeseado))
    );
  }

  retornarPrecio(idLibro: string) {
    this.getLibro(idLibro).subscribe((libro) => {
      return libro.precio;
    })
  }
}

