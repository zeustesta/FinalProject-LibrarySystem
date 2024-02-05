import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { InicioModuleRoutingModule } from './inicio-routing.module';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { CarritoComponent } from './carrito/carrito.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { VentasComponent } from './ventas/ventas.component';
import { LibroDetalleComponent } from './libro-detalle/libro-detalle.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { FormsModule } from '@angular/forms';
import { HistorialCompraComponent } from './historial-compra/historial-compra.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    ListaLibrosComponent,
    CarritoComponent,
    UsuarioComponent,
    VentasComponent,
    LibroDetalleComponent,
    FavoritosComponent,
    HistorialCompraComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    InicioModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class InicioModuleModule { }
