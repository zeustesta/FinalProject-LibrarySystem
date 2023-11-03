import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/plantillaUsuario';
import { v4 as uuidv4 } from 'uuid'
import { Libro } from '../interfaces/plantillaLibro';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  user1 = {
    id: uuidv4(),
    nombre: 'admin',
    apellido: 'admin',
    email: 'admin@gmail.com',
    password: '12345678',
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
    const storedUser= localStorage.getItem('usuarioActual');
    if(storedUser){
      this.usuarioActual = JSON.parse(storedUser);
    }

    console.log(this.usuarioActual);
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

  iniciarSesion(email: string, password: string){
    const encontrado = this.listaUsuarios.find((u) => (u.email === email) && (u.password === password));

    if(encontrado){
      this.establecerUsuarioActual(encontrado);
      localStorage.setItem('usuarioActual', JSON.stringify(encontrado));
      alert('Logueo Exitoso');
    }else{
      alert('Email o Password Incorrectos');
    }

  }
  
  establecerUsuarioActual(usuario:Usuario){
    this.usuarioActual= usuario;
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }
  
  getUserList(){
    return this.listaUsuarios;
  }

  agregarAlCarrito(libro: Libro){
    const indexUsuarioActual = this.listaUsuarios.findIndex((u) => u.id == this.usuarioActual?.id);

    this.listaUsuarios[indexUsuarioActual].carrito.push(libro);

    this.actualizarLocalStorage();
    console.log(this.listaUsuarios)
  }

  actualizarLocalStorage(){
    localStorage.setItem('usuariosData', JSON.stringify(this.listaUsuarios));
  }
}
