import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.registerForm = this.formBuilder.group({
      name:[''],
      surname:[''],
      email:[''],
      password:['']
    })
  }

  
}
