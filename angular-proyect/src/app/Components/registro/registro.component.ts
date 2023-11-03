import { Component} from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/plantillaUsuario';

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

    this.ObservarEmail();
  }

  addToUsersList(){
    let name = this.registerForm.value.name;
    let surname = this.registerForm.value.surname;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;

    if(this.validarEmail(email)){
      this.uService.agregarUsuario(name, surname, email, password);
      this.router.navigate(['/login']);
    }
  }

  validarEmail(nuevoEmail: string): boolean{
    for(const usuario of this.uService.listaUsuarios){
      if(usuario.email.toLowerCase() === nuevoEmail.toLowerCase()){
        return false; //El correo ya se encuentra en uso
      }
    }
    return true; //El correo es unico
  }

  ObservarEmail() {
    const emailControl = this.registerForm.get('email');
    if (emailControl) { 
      emailControl.valueChanges.subscribe((nuevoEmail) => {
        this.emailEnUso = !this.validarEmail(nuevoEmail);
      });
    }
  }
}
