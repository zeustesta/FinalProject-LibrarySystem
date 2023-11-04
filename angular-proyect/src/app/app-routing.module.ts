import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { LoginComponent } from './Components/login/login.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { ListaLibrosComponent } from './Components/lista-libros/lista-libros.component';

const routes: Routes = [
  {
    path:'', 
    component: InicioComponent,
  },
  {
    path: 'carrito',
    component: CarritoComponent
  },
  {
    path: 'register',
    component: RegistroComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuarios',
    component: UsuarioComponent
  },
  {
    path: 'libros',
    component: ListaLibrosComponent
  },
  {
    path:'**', 
    redirectTo: '', 
    pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
