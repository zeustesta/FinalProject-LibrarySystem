import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  tituloBusqueda: string='';
  
  constructor(private cService: ClienteService, private router: Router){ }
  
  isAdmin(){
    return this.cService.rolActual;
  }

  isLoggedIn(){
    return this.cService.estaLogueado();
  }

  logOut(){
    this.cService.cerrarSesion();
  }

  buscarLibros(){
    this.router.navigate([`/inicio/libros/${this.tituloBusqueda}`]);
  }
}
