import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { ListaLibrosComponent } from './Components/lista-libros/lista-libros.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { LibroDetalleComponent } from './Components/libro-detalle/libro-detalle.component';

const routes: Routes = [
  {path:'', component: InicioComponent},
  {path:'libros', component: ListaLibrosComponent},
  {path:'carrito', component: CarritoComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegistroComponent},
  {path:'usuarios', component: UsuarioComponent},
  {path:'libro_detalle/:id_libro', component: LibroDetalleComponent},
  {path:'**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
