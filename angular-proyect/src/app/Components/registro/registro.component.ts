import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/plantillaUsuario';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private uService: UsuariosService, private router: Router){
    this.registerForm = this.formBuilder.group({
      name:[''],
      surname:[''],
      email:[''],
      password:['']
    })
  }

  addToUsersList(){
    let name = this.registerForm.value.name;
    let surname = this.registerForm.value.surname;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;

    this.uService.agregarUsuario(name, surname, email, password);
  }
}
