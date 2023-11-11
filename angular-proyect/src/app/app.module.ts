import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio-module/inicio/inicio.component';
import { NavbarComponent } from './inicio-module/navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CarrouselComponent } from './inicio-module/carrousel/carrousel.component';
import { FiltroComponent } from './inicio-module/filtro/filtro.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    CarrouselComponent,
    FiltroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
