import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CarritoComponent } from './carrito/carrito.component';
import { InicioComponent } from './inicio/inicio.component';
import { VentasComponent } from './ventas/ventas.component';
import { FiltroComponent } from './filtro/filtro.component';
import { LibroDetalleComponent } from './libro-detalle/libro-detalle.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { authGuard } from '../utils/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegistroComponent
      },
      {
        path: 'libros/:titulo',
        component: ListaLibrosComponent
      },
      {
        path: 'libros',
        component: ListaLibrosComponent
      },
      {
        path: 'usuarios',
        component: UsuarioComponent,
        canActivate: [authGuard]
      },
      {
        path: 'carrito',
        component: CarritoComponent,
        canActivate: [authGuard]
      },
      {
        path: 'ventas',
        component: VentasComponent,
        canActivate: [authGuard]
      },
      {
        path: 'favoritos',
        component: FavoritosComponent,
        canActivate: [authGuard]
      },
      {
        path: 'filtro/:genero',
        component: FiltroComponent
      },
      {
        path:'libro_detalle/:idLibro', 
        component: LibroDetalleComponent
      },
      {
        path: '**',
        redirectTo: 'inicio' 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioModuleRoutingModule { }
