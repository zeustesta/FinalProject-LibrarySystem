import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { InicioComponent } from './inicio-module/inicio/inicio.component';
// import { CarritoComponent } from './inicio-module/carrito/carrito.component';
// import { RegistroComponent } from './inicio-module/registro/registro.component';
// import { LoginComponent } from './inicio-module/login/login.component';
// import { UsuarioComponent } from './inicio-module/usuario/usuario.component';
// import { ListaLibrosComponent } from './inicio-module/lista-libros/lista-libros.component';

const routes: Routes = [
  {
    path:'inicio', 
    loadChildren: () =>
      import('./inicio-module/inicio.module').then((m) => m.InicioModuleModule)
  },
  {
    path:'**', 
    redirectTo: 'inicio', 
    pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
