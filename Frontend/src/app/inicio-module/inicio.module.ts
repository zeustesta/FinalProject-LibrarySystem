// MODULES

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { InicioModuleRouting } from './inicio-routing.module';
import { FormsModule } from '@angular/forms';

// COMPONENTS

import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { CarritoComponent } from './carrito/carrito.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { VentasComponent } from './ventas/ventas.component';
import { LibroDetalleComponent } from './libro-detalle/libro-detalle.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { HistorialCompraComponent } from './historial-compra/historial-compra.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AddBookComponent } from './add-book/add-book.component';


@NgModule({
  declarations: [
    ListaLibrosComponent,
    CarritoComponent,
    UsuarioComponent,
    VentasComponent,
    LibroDetalleComponent,
    FavoritosComponent,
    HistorialCompraComponent,
    SpinnerComponent,
    AddBookComponent,
  ],
  imports: [
    CommonModule,
    InicioModuleRouting,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    SpinnerComponent
  ]
})
export class InicioModule { }
