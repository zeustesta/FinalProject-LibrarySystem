import { Injectable } from '@angular/core';
import { Venta } from '../interfaces/plantillaVenta';
import { UsuariosService } from './usuarios.service';
import { v4 as uuidv4 } from 'uuid';
import { APIService } from './api.service';
import { StorageService } from './storage.service';
import { Observable, Observer, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment.prod';
import { Libro } from '../interfaces/plantillaLibro';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private appUrl: string; 
  private apiUrl: string;

  constructor(private uService: UsuariosService, private aService: APIService, private storage: StorageService, private http: HttpClient) {
    this.appUrl = environment.apiUrl;
    this.apiUrl = '/api/ventas';
  }

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.appUrl}${this.apiUrl}/getVentas`)
  }

  getVenta(idVenta: string): Observable<Venta> {
    return this.http.get<Venta>(`${this.appUrl}${this.apiUrl}/getVenta/${idVenta}`);
  }

  deleteVenta(idVenta: string): Observable<string> {
    return this.http.delete<string>(`${this.appUrl}${this.apiUrl}/deleteVenta/${idVenta}`);
  }

  postVenta(idVenta: string, idCliente: string, total: number): Observable<string> {
    const body = { idVenta: idVenta, idCliente: idCliente, total: total };
    return this.http.post<string>(`${this.appUrl}${this.apiUrl}/postVenta`, body);
  }

  updateVenta(idVenta: string, estado: string): Observable<string> {
    return this.http.put<string>(`${this.appUrl}${this.apiUrl}/updateVenta/${idVenta}`, { estado: estado });
  }

  postLibroVendido(idVenta: string, idLibro: string): Observable<string> {
    const libroVendido = { idVenta: idVenta, idLibro: idLibro };
    return this.http.post<string>(`${this.appUrl}${this.apiUrl}/postLibroVendido`, libroVendido);
  }

  getLibrosPorVenta(idVenta: string): Observable<any> {
    return this.http.get<any>(`${this.appUrl}${this.apiUrl}/getLibrosPorVenta/${idVenta}`);
  }

  calcularTotal(arrayIds: string[]) {
    const arrayObservables = arrayIds.map(idLibro => this.aService.getLibro(idLibro));

    forkJoin(arrayObservables).subscribe((libros: Libro[]) => {
      const arrayValores: number[] = libros.map(libro => Number(libro.precio));

      let total = 0;
      for (let i = 0; i < arrayValores.length; i++) {
        total = total + arrayValores[i];
      }
      return total;
    });
  }
}
