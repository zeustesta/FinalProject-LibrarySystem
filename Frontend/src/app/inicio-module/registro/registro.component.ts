import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {
  registerForm: FormGroup;
  emailEnUso: boolean = false;

  constructor(private formBuilder: FormBuilder, private uService: UsuariosService, private router: Router){
    this.registerForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      surname:['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email:['', [Validators.email, Validators.min(5), Validators.required]],
      password:['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]]
    })
  }

  addToUsersList(){
    let name = this.registerForm.value.name;
    let surname = this.registerForm.value.surname;
    let password = this.registerForm.value.password;
    let email = this.registerForm.value.email;

    this.uService.validarEmail(email).subscribe((existe) => {
      if (existe) {
        alert('El email ya esta en uso');
      } else {
        const newCliente = {
          idCliente: uuidv4(),
          nombre: name,
          apellido: surname,
          email: email,
          password: password,
          rol: 'usuario'
        };
        this.uService.postCliente(newCliente).subscribe();
        this.router.navigate(['/inicio/login']);
      }
    });
  }
}
