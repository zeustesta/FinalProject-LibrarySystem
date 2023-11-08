import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { InicioModuleRoutingModule } from './inicio-routing.module';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CarritoComponent } from './carrito/carrito.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { VentasComponent } from './ventas/ventas.component';
import { LibroDetalleComponent } from './libro-detalle/libro-detalle.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaLibrosComponent,
    LoginComponent,
    RegistroComponent,
    CarritoComponent,
    UsuarioComponent,
    VentasComponent,
    LibroDetalleComponent,
    FavoritosComponent
  ],
  imports: [
    CommonModule,
    InicioModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InicioModuleModule { }
