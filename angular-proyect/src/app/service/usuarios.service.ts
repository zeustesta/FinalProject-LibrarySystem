import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/plantillaUsuario';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  user1 = {
    id: uuidv4(),
    nombre: 'Pepito',
    apellido: 'Gimenez',
    email: 'pepito@gmail.com',
    password: '123',
    carrito: []
  }

  user2 = {
    id: uuidv4(),
    nombre: 'Fulanito',
    apellido: 'Gonzalez',
    email: 'fulanito@hotmail.com',
    password: '123',
    carrito: [] 
  }

  listaUsuarios: Usuario[] = [this.user1, this.user2];


  constructor() {  }

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
  }

  iniciarSesion(email: string, password: string){
    let logueado = false;

    this.listaUsuarios.forEach(e => {
      if(e.email = email){
        if(e.password = password){
          logueado = true;
          alert('Logueado correctamente');
        }
      }
    })
    if(logueado == false){
      alert('Email o contraseña incorrecta');
    }
  }
}
