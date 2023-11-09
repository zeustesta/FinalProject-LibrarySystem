import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private uService: UsuariosService){

  }

  isAdmin(){
    return this.uService.esAdmin();
  }

  isLoggedIn(){
    return this.uService.estaLogueado();
  }

  logOut(){
    this.uService.cerrarSesion();
  }
}
