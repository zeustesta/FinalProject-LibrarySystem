import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/plantillaUsuario';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  usuarioActual: Usuario | null = null;

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
    const storedUser= localStorage.getItem('usuarioActual');
    if(storedUser){
      this.usuarioActual = JSON.parse(storedUser);
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
      this.establecerUsuarioActual(encontrado);
      localStorage.setItem('usuarioActual',JSON.stringify(encontrado));
      alert('Logueo Exitoso');
    }else{
      alert('Email o Password Incorrectos');
    }
  }

  cerrarSesion() {
    this.usuarioActual = null;
    localStorage.removeItem('usuarioActual');
    // Se puede agregar tambien que se remueve el usuarioActual cuando se cierra la ventana o un boton de cerrar sesion
  }
  

  establecerUsuarioActual(usuario:Usuario){
    this.usuarioActual= usuario;
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }
  
  getUserList(){
    console.log(this.listaUsuarios)
    console.log(this.usuarioActual);
    return this.listaUsuarios;
  }
}
