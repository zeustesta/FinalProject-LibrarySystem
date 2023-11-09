import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/plantillaUsuario';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  user1 = {
    id: uuidv4(),
    nombre: 'admin',
    apellido: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    carrito: [],
    favoritos: []
  }

  user2 = {
    id: uuidv4(),
    nombre: 'usuario',
    apellido: 'usuario',
    email: 'usuario@gmail.com',
    password: 'usuario',
    carrito: [],
    favoritos: []
  }

  listaUsuarios: Usuario[] = [this.user1, this.user2];
  usuarioActual: Usuario | null = null;

  constructor(private storage: StorageService) { 
    if(this.storage.getItem('usuariosData') == null){
      this.storage.setItem('usuariosData', this.listaUsuarios);
    }else{
      this.listaUsuarios = this.storage.getItem('usuariosData');
    }
  }

  agregarUsuario(nombre: string, apellido: string, email: string, password: string): void{
    let newUser: Usuario = {
      id: uuidv4(),
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
      carrito: [],
      favoritos: []
    }

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
    if(this.usuarioActual?.email === 'admin@gmail.com'){
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
