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
    if(this.uService.obtenerUsuarioActual()?.email == 'admin@gmail.com'){
      return true; //Es admin
    }else{
      return false; //Es usuario
    }
  }

  isLoggedIn(){
    if(this.uService.obtenerUsuarioActual() != null){
      return true; //Esta logueado
    }else{
      return false; //No esta logueado
    }
  }

  logOut(){
    this.uService.cerrarSesion();
  }
}
