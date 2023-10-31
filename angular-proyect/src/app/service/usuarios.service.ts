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
    
    console.log(this.listaUsuarios);
  }

  iniciarSesion(email: string, password: string){
    const encontrado = this.listaUsuarios.find((u) => (u.email === email) && (u.password === password));

    if(encontrado){
      alert('Logueo Exitoso');
    }else{
      alert('Email o Password Incorrectos');
    }

  //   this.listaUsuarios.forEach(e => {
  //     if(e.email = email){
  //       if(e.password = password){
  //         logueado = true;
  //         alert('Logueado correctamente');
  //       }
  //     }
  //   })
  //   if(logueado == false){
  //     alert('Email o contraseña incorrecta');
  //   }
  }
  
  getUserList(){
    console.log(this.listaUsuarios)
    return this.listaUsuarios;
  }
}
