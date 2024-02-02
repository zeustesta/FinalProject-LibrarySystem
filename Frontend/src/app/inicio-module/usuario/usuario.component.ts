import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/plantillaUsuario';
import { UsuariosService } from 'src/app/service/usuarios.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  listaClientes: Usuario[] = [];

  constructor(private uService: UsuariosService){
    this.getClientes()
  }

  getClientes() {
    this.uService.getClientes().subscribe((clientes) => {
      this.listaClientes = clientes;
    })
  }

  updateRolCliente(idCliente:string,nuevoRol:string){
    this.uService.updateRolCliente(idCliente,nuevoRol).subscribe((data) =>{
      console.log(data);
    });
  }
}
