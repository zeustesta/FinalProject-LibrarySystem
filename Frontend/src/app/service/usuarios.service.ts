import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/plantillaUsuario';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { Libro } from '../interfaces/plantillaLibro';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private appUrl: string; 
  private apiUrl: string;
  usuarioActual: string | null;
  rolActual: boolean = false;

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

  updateRolCliente(idCliente: string,rol:string):Observable<string>{
    return this.http.put<string>(`${this.apiUrl}${this.apiUrl}/updateClienteRol/${idCliente}`,rol);  
  }

  deleteCliente(idCliente: string): Observable<string> { 
    return this.http.delete<string>(`${this.appUrl}${this.apiUrl}/deleteCliente/${idCliente}`);
  }

  validarCliente(email: string, password: string): Observable<Usuario | null> {
    return this.http.post<Usuario | null>(`${this.appUrl}${this.apiUrl}/validarCliente`, { email, password });
  }
  
  validarEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.appUrl}${this.apiUrl}/validarEmail`, { email: email });
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

  buscarEnFavs(idLibro: string) {
    const actual = this.obtenerUsuarioActual();

    return this.getFavs(actual!).pipe(
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

  postCart(idCliente: string, idLibro: string): Observable<string> {
    const body = { idCliente, idLibro };
    return this.http.post<string>(`${this.appUrl}${this.apiUrl}/postLibroEnCart`, body);
  }

  deleteCart(idCliente: string, idLibro: string): Observable<string> {
    return this.http.delete<string>(`${this.appUrl}${this.apiUrl}/deleteLibroCart/${idCliente}/${idLibro}`);
  }

  cleanCart(idCliente: string): Observable<string> {
    return this.http.delete<string>(`${this.appUrl}${this.apiUrl}/deleteCarrito/${idCliente}`);
  }

  buscarEnCart(idLibro: string) {
    const actual = this.obtenerUsuarioActual();

    return this.getCart(actual!).pipe(
        map((cart) => {
            if (cart) {
                for (let i = 0; i < cart.length; i++) {
                    if (idLibro === cart[i]['idLibro']) {
                        return true;  // El libro existe en el carrito
                    }
                }
            }
            return false;  // El libro no existe en el carrito
        })
    );
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
        if (userData.rol === 'admin') {
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
