import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { InicioModuleRoutingModule } from './inicio-routing.module';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CarritoComponent } from './carrito/carrito.component';
import { UsuarioComponent } from './usuario/usuario.component';
// import { CarrouselComponent } from './carrousel/carrousel.component';


@NgModule({
  declarations: [
    ListaLibrosComponent,
    LoginComponent,
    RegistroComponent,
    CarritoComponent,
    UsuarioComponent,
    // CarrouselComponent
  ],
  imports: [
    CommonModule,
    InicioModuleRoutingModule,
    ReactiveFormsModule
  ]
})
export class InicioModuleModule { }
