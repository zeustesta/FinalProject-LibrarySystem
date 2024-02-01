import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  tituloBusqueda: string='';
  
  constructor(private uService: UsuariosService, private router: Router){ }
  
  isAdmin(){
    return this.uService.rolActual;
  }

  isLoggedIn(){
    return this.uService.estaLogueado();
  }

  logOut(){
    this.uService.cerrarSesion();
  }

  buscarLibros(){
    this.router.navigate([`/inicio/libros/${this.tituloBusqueda}`]);
  }
}
