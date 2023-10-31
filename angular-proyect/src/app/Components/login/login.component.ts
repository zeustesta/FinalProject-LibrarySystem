import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UsuariosService, private router: Router){
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  signIn(){
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    this.us.iniciarSesion(email, password);
  }
}
