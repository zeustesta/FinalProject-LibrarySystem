import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/service/cliente.service';
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

  constructor(private formBuilder: FormBuilder, private cService: ClienteService, private router: Router){
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

    this.cService.validarEmail(email).subscribe((existe) => {
      if (existe.msg === 'NO_EXISTE' ) {
        const newCliente = {
          idCliente: uuidv4(),
          nombre: name,
          apellido: surname,
          email: email,
          password: password,
          rol: 'USER'
        };
        alert('Registrado de forma exitosa');
        this.cService.postCliente(newCliente).subscribe();
        this.router.navigate(['/login']);
      } else {
        alert('El email ya esta en uso');
      }
    });
  }
}
