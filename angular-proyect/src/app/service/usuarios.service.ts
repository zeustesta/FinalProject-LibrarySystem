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
    carrito: []
  }

  user2 = {
    id: uuidv4(),
    nombre: 'usuario',
    apellido: 'usuario',
    email: 'usuario@hotmail.com',
    password: '12345678',
    carrito: [] 
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

  agregarUsuario(nombre: string, apellido: string, email: string, password: string){
    let newUser: Usuario = {
      id: uuidv4(),
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
      carrito: []
    }

    this.listaUsuarios.push(newUser);
    this.storage.updateItem('usuariosData', this.listaUsuarios);
  }

  buscarUsuario(email: string, password: string){
    const encontrado = this.listaUsuarios.find((u) => (u.email === email) && (u.password === password));

    return encontrado;
  }

  cerrarSesion(){
    this.usuarioActual = null;
    this.storage.removeItem('usuarioActual');
  }
  
  establecerUsuarioActual(usuario: Usuario){
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
  
  getUserList(){
    return this.listaUsuarios;
  }

  actualizarUsuarios(){
    this.storage.setItem('usuariosData', this.listaUsuarios);
  }
}
