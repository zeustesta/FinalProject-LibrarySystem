// MODULES

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS

import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CarritoComponent } from './carrito/carrito.component';
import { InicioComponent } from './inicio/inicio.component';
import { VentasComponent } from './ventas/ventas.component';
import { FiltroComponent } from './filtro/filtro.component';
import { LibroDetalleComponent } from './libro-detalle/libro-detalle.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { usersGuard } from '../utils/auth.guard';
import { adminGuard } from '../utils/admin-guard.guard';
import { HistorialCompraComponent } from './historial-compra/historial-compra.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
  {
    path: '', 
    children: [
      {
        path: '',
        component: InicioComponent
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
        path: 'agregarLibro',
        component: AddBookComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'usuarios',
        component: UsuarioComponent,
        canActivate: [adminGuard]
      },
      {
        path:'historial',
        component: HistorialCompraComponent,
        canActivate: [usersGuard]
      },
      {
        path: 'carrito',
        component: CarritoComponent,
        canActivate: [usersGuard],
      },
      {
        path: 'ventas',
        component: VentasComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'favoritos',
        component: FavoritosComponent,
        canActivate: [usersGuard],
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
        redirectTo: '' 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioModuleRouting { }
