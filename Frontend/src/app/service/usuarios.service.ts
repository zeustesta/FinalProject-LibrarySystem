import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/plantillaUsuario';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private appUrl: string; 
  private apiUrl: string;
  listaUsuarios: Usuario[] = [];
  usuarioActual: Usuario | null = null;

  constructor(private storage: StorageService, private http: HttpClient) { 
    this.appUrl = environment.apiUrl;
    this.apiUrl = '/api/clientes';
    if(this.storage.getItem('usuariosData') == null){
      this.storage.setItem('usuariosData', this.listaUsuarios);
    }else{
      this.listaUsuarios = this.storage.getItem('usuariosData');
    }
  }

  getClientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.appUrl}${this.apiUrl}/getClientes`);
  }

  agregarUsuario(nombre: string, apellido: string, email: string, password: string): void{
    let newUser: Usuario = {
      id: uuidv4(),
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
      carrito: [],
      favoritos: [],
      rol: 'usuario'
    };

    this.listaUsuarios.push(newUser);
    this.storage.updateItem('usuariosData', this.listaUsuarios);
  }

  buscarUsuario(email: string, password: string): Usuario | undefined{
    const encontrado = this.listaUsuarios.find((u) => (u.email === email) && (u.password === password));

    return encontrado;
  }

  cerrarSesion(): void{
    this.usuarioActual = null;
    this.storage.removeItem('usuarioActual');
  }
  
  establecerUsuarioActual(usuario: Usuario): void{
    this.usuarioActual = usuario;
    this.storage.setItem('usuarioActual', usuario);
  }

  obtenerUsuarioActual(): Usuario | null {
    const usuarioAlmacenado = this.storage.getItem('usuarioActual');

    if (usuarioAlmacenado) {
      return usuarioAlmacenado;
    }else{
      return null;
    }
  }

  obtenerIndex(idUsuario: string): number{
    const indexUsuario = this.listaUsuarios.findIndex((u) => u.id = idUsuario);
    if(indexUsuario !== -1){
      return indexUsuario;
    }else{
      return -1;
    }
  }
  
  getUserList(): Usuario[]{
    return this.listaUsuarios;
  }

  actualizarUsuarios(): void{
    this.storage.setItem('usuariosData', this.listaUsuarios);
  }

  esAdmin(){
    if(this.usuarioActual?.rol === 'admin'){
      return true; //Es admin
    }else{
      return false; //Es usuario
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
