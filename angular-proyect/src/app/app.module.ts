import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { UsuarioComponent } from './inicio-module/usuario/usuario.component';
// import { CarritoComponent } from './inicio-module/carrito/carrito.component';
// import { ListaLibrosComponent } from './inicio-module/lista-libros/lista-libros.component';
import { InicioComponent } from './inicio-module/inicio/inicio.component';
import { NavbarComponent } from './inicio-module/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms'
import { CarrouselComponent } from './inicio-module/carrousel/carrousel.component';
// import { LoginComponent } from './inicio-module/login/login.component';
// import { RegistroComponent } from './inicio-module/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    // UsuarioComponent,
    // CarritoComponent,
    // ListaLibrosComponent,
    InicioComponent,
    NavbarComponent,
    CarrouselComponent,
    // LoginComponent,
    // RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent] //Aca carga la pagina
})
export class AppModule { }
