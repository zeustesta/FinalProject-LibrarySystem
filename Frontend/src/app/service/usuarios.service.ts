import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/plantillaUsuario';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { Libro } from '../interfaces/plantillaLibro';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private appUrl: string; 
  private apiUrl: string;
  usuarioActual: string | null;

  constructor(private storage: StorageService, private http: HttpClient) { 
    this.appUrl = environment.apiUrl;
    this.apiUrl = '/api/clientes';
    this.usuarioActual = null;
  }

  //METODOS PARA CLIENTE

  getClientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.appUrl}${this.apiUrl}/getClientes`);
  }

  getCliente(idCliente: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.appUrl}${this.apiUrl}/getCliente/${idCliente}`);
  }

  postCliente(newClient: Usuario): Observable<string> {
    return this.http.post<string>(`${this.appUrl}${this.apiUrl}/postCliente`, newClient);
  }

  updateCliente(idCliente: string, update: Usuario): Observable<string> {
    return this.http.put<string>(`${this.appUrl}${this.apiUrl}/updateCliente/${idCliente}`, update);
  }

  deleteCliente(idCliente: string): Observable<string> { 
    return this.http.delete<string>(`${this.appUrl}${this.apiUrl}/deleteCliente/${idCliente}`);
  }

  //METODOS PARA FAVS DEL CLIENTE

  getFavs(idCliente: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.appUrl}${this.apiUrl}/getFavs/${idCliente}`);
  }

  postFav(idCliente: string, idLibro: string): Observable<string> {
    const body = { idCliente, idLibro };
    return this.http.post<string>(`${this.appUrl}${this.apiUrl}/postLibroEnFavs`, body);
  }

  deleteFav(idCliente: string, idLibro: string): Observable<string> {
    return this.http.delete<string>(`this.appUrl}${this.apiUrl}/deleteLibroFavs/${idCliente}/${idLibro}`);
  }

  //METODOS PARA CART DEL CLIENTE

  getCart(idCliente: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.appUrl}${this.apiUrl}/getCart/${idCliente}`);
  }

  postCart(idCliente: string, idLibro: string): Observable<string> {
    const body = { idCliente, idLibro };
    return this.http.post<string>(`${this.appUrl}${this.apiUrl}/postLibroEnCart`, body);
  }

  deleteCart(idCliente: string, idLibro: string): Observable<string> {
    return this.http.delete<string>(`${this.appUrl}${this.apiUrl}/deleteLibroCart/${idCliente}/${idLibro}`);
  }

  //METODO PARA EL HISTORIAL DEL CLIENTE

  getHistorial(idCliente: string): Observable<any> {
    return this.http.get<any>(`${this.appUrl}${this.apiUrl}/getHistorial/${idCliente}`)
  }

  //METODOS PARA USUARIO ACTUAL

  establecerUsuarioActual(usuario: string): void{
    this.usuarioActual = usuario;
    this.storage.setItem('usuarioActual', usuario);
  }

  cerrarSesion(): void{
    this.usuarioActual = null;
    this.storage.removeItem('usuarioActual');
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.storage.getItem('usuarioActual');
  }

  esAdmin(){
    if(this.estaLogueado()){
      this.getCliente(this.usuarioActual!).subscribe((userData) => {
        if (userData.rol === 'admin') {
          return true; //es admin
        } else {
          return false; //no es admin
        }
      })
    }
  }

  estaLogueado(){
    if(this.usuarioActual !== null){
      return true; //Esta logueado
    }else{
      return false; //No esta logueado
    }
  }
}
