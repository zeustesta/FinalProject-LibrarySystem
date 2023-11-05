import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/plantillaUsuario';
import { v4 as uuidv4 } from 'uuid';

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

  constructor() { 
    const storedData = localStorage.getItem('usuariosData');
    if (storedData) {
      this.listaUsuarios = JSON.parse(storedData);
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

    localStorage.setItem('usuariosData', JSON.stringify(this.listaUsuarios));
  }

  buscarUsuario(email: string, password: string){
    const encontrado = this.listaUsuarios.find((u) => (u.email === email) && (u.password === password));

    return encontrado;
  }

  cerrarSesion(){
    this.usuarioActual = null;
    localStorage.removeItem('usuarioActual');
  }
  
  establecerUsuarioActual(usuario:Usuario){
    this.usuarioActual = usuario;
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  }

  obtenerUsuarioActual(): Usuario | null {
    const usuarioAlmacenado = localStorage.getItem('usuarioActual');
    if (usuarioAlmacenado) {
      return JSON.parse(usuarioAlmacenado);
    }else{
      return null;
    }
  }
  
  getUserList(){
    return this.listaUsuarios;
  }

  actualizarLocalStorage(){
    localStorage.setItem('usuariosData', JSON.stringify(this.listaUsuarios));
  }
}
