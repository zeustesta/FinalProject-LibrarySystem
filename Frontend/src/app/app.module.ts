// MODULES

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { InicioModule } from './inicio-module/inicio.module';

// COMPONENTS

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio-module/inicio/inicio.component';
import { NavbarComponent } from './inicio-module/navbar/navbar.component';
import { FiltroComponent } from './inicio-module/filtro/filtro.component';
import { FooterComponent } from './inicio-module/footer/footer.component';
import { LoginComponent } from './Seguridad/login/login.component';
import { RegistroComponent } from './Seguridad/registro/registro.component';
import { CarrouselComponent } from './inicio-module/carrousel/carrousel.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    FiltroComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    CarrouselComponent,
    NextDirective,
    PrevDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    InicioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
