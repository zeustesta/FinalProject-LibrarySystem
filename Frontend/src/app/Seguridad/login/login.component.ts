import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private cService: ClienteService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
    })
  }

  signIn(){
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    this.cService.validarCliente(email, password).subscribe((cliente) => {
      if (cliente) {
        this.cService.establecerUsuarioActual(cliente.idCliente);
        this.cService.esAdmin();
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/inicio']);
      } else {
        alert('No existe un usuario con esas credenciales');
      }
    })
  }
}
