import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/plantillaUsuario';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  listaClientes: Usuario[] = [];

  constructor(private cService: ClienteService, private router: Router){
    this.getClientes()
  }

  getClientes() {
    this.cService.getClientes().subscribe((clientes) => {
      this.listaClientes = clientes;
    })
  }

  updateRolCliente(idCliente: string, nuevoRol: string){
    this.cService.getCliente(idCliente).subscribe((cliente) => {
      if (cliente.email === 'admin@gmail.com') {
        alert('El admin por defecto no puede ser modificado');
      } else {
        this.cService.updateRolCliente(idCliente, nuevoRol).subscribe(() =>{
          this.getClientes();
          const index = this.listaClientes.findIndex((cliente) => cliente.idCliente = idCliente);
          this.listaClientes[index].rol = nuevoRol;
          if (this.cService.obtenerUsuarioActual() === idCliente && nuevoRol === 'USER') {
            alert('Usted ya no es más administrador, inicie sesion nuevamente');
            this.cService.cerrarSesion();
            this.router.navigate(['/login']);
          }
        });
      }
    })
  }
}
