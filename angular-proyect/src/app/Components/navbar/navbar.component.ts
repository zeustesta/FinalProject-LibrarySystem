import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(){

  }

  cerrarSesion(){
    localStorage.removeItem('usuarioActual');
    console.log("Sesion cerrada");
  }
}
