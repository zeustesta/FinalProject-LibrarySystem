import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
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

  ngOnInit(): void {
    // this.ObservarEmail()
  }

  addToUsersList(){
    let name = this.registerForm.value.name;
    let surname = this.registerForm.value.surname;
    let password = this.registerForm.value.password;
    let email = this.registerForm.value.email;
    this.ObservarEmail(email);
    

    const newCliente = {
      idCliente: uuidv4(),
      nombre: name,
      apellido: surname,
      email: email,
      password: password,
      rol: 'usuario'
    };

    if (this.emailEnUso === true) {
      console.log('Hola');
      alert('El email ya esta en uso');
    } else {
      this.uService.postCliente(newCliente).subscribe();
      this.router.navigate(['/login']);
    }
  }

  ObservarEmail(email: string) {
    // const emailControl = this.registerForm.get('email');
    const nuevoEmail = this.registerForm.value.email;
  
    // if (emailControl) {
      // emailControl.valueChanges.subscribe((nuevoEmail: string) => {
        // if (nuevoEmail) {  
          this.uService.validarEmail(nuevoEmail).subscribe((existe: boolean) => {
            this.emailEnUso = existe;
          });
        // }
      // });
    // }
  }
}
