import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/plantillaUsuario';
import { UsuariosService } from 'src/app/service/usuarios.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  listaUsuarios: Usuario[] = [];

  constructor(private usuarioService: UsuariosService){
    this.listaUsuarios = this.usuarioService.getUserList()
  }
}
