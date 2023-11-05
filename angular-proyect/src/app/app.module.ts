import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio-module/inicio/inicio.component';
import { NavbarComponent } from './inicio-module/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms'
import { CarrouselComponent } from './inicio-module/carrousel/carrousel.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    CarrouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
