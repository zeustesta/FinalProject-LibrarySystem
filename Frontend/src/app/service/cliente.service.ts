import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/plantillaUsuario';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { Libro } from '../interfaces/plantillaLibro';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private appUrl: string; 
  private apiUrl: string;
  usuarioActual: string | null;
  rolActual: boolean = false;

  constructor(private storage: StorageService, private http: HttpClient, private aService: APIService) { 
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

  updateRolCliente(idCliente: string, rol: string):Observable<string>{
    return this.http.put<string>(`${this.appUrl}${this.apiUrl}/updateClienteRol/${idCliente}`, { rol: rol});  
  }

  deleteCliente(idCliente: string): Observable<string> { 
    return this.http.delete<string>(`${this.appUrl}${this.apiUrl}/deleteCliente/${idCliente}`);
  }

  validarCliente(email: string, password: string): Observable<Usuario | null> {
    return this.http.post<Usuario | null>(`${this.appUrl}${this.apiUrl}/validarCliente`, { email, password });
  }
  
  validarEmail(email: string): Observable<{ msg: string}> {
    return this.http.post<{ msg: string}>(`${this.appUrl}${this.apiUrl}/validarEmail`, { email: email });
  }

  //METODOS PARA FAVS DEL CLIENTE

  getFavs(idCliente: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.appUrl}${this.apiUrl}/getFavs/${idCliente}`);
  }

  postFav(idCliente: string, idLibro: string): Observable<string> {
    const body = { idCliente: idCliente, idLibro: idLibro };
    return this.http.post<string>(`${this.appUrl}${this.apiUrl}/postLibroEnFavs`, body);
  }

  deleteFav(idCliente: string, idLibro: string): Observable<string> {
    return this.http.delete<string>(`${this.appUrl}${this.apiUrl}/deleteLibroFavs/${idCliente}/${idLibro}`);
  }

  buscarEnFavs(idLibro: string, idCliente: string) {
    return this.getFavs(idCliente).pipe(
        map((favs) => {
            if (favs) {
                for (let i = 0; i < favs.length; i++) {
                    if (idLibro === favs[i]['idLibro']) {
                        return true;  // El libro existe en el carrito
                    }
                }
            }
            return false;  // El libro no existe en el carrito
        })
    );
  }

  //METODOS PARA CART DEL CLIENTE

  getCart(idCliente: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.appUrl}${this.apiUrl}/getCart/${idCliente}`);
  }

  postLibroToCart(idCliente: string, idLibro: string): Observable<{ agregado: number }> {
    const body = { idCliente, idLibro };
    return this.http.post<{ agregado: number }>(`${this.appUrl}${this.apiUrl}/postLibroEnCart`, body);
  }

  addLibroToCart(idLibro: string): Observable<boolean> {
    const actual = this.obtenerUsuarioActual();
  
    if (actual === null) {
      alert('Debe iniciar sesión');
      return of(false);
    } else {
      return this.postLibroToCart(actual, idLibro).pipe(
        map((res) => {
          if (res.agregado === -1) {
            alert('No hay stock');
            return false;
          } else if (res.agregado === 0) {
            alert('Ya existe en el carrito');
            return false;
          } else {
            alert('Agregado correctamente');
            return true;
          }
        })
      );
    }
  }

  deleteCart(idCliente: string, idLibro: string): Observable<string> {
    return this.http.delete<string>(`${this.appUrl}${this.apiUrl}/deleteLibroCart/${idCliente}/${idLibro}`);
  }

  cleanCart(idCliente: string): Observable<string> {
    return this.http.delete<string>(`${this.appUrl}${this.apiUrl}/deleteCarrito/${idCliente}`);
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
    this.rolActual = false;
    this.storage.removeItem('usuarioActual');
  }

  obtenerUsuarioActual(): string | null {
    return this.storage.getItem('usuarioActual');
  }

  esAdmin(){
    if(this.estaLogueado()){
      this.getCliente(this.usuarioActual!).subscribe((userData) => {
        if (userData.rol === 'ADMIN') {
          this.rolActual = true; //es admin
        } else {
          this.rolActual = false; //no es admin
        }
      });
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
