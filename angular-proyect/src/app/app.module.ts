import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibroComponent } from './Components/libro/libro.component'
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { ListaLibrosComponent } from './Components/lista-libros/lista-libros.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CarrouselComponent } from './Components/carrousel/carrousel.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LibroComponent,
    UsuarioComponent,
    CarritoComponent,
    ListaLibrosComponent,
    InicioComponent,
    NavbarComponent,
    CarrouselComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent] //Aca carga la pagina
})
export class AppModule { }
