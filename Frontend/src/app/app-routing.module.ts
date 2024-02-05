import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './inicio-module/login/login.component';
import { RegistroComponent } from './inicio-module/registro/registro.component';

const routes: Routes = [
  {
    path:'inicio',
    loadChildren: () =>
      import('./inicio-module/inicio.module').then((m) => m.InicioModuleModule)
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
    path:'**', 
    redirectTo: 'inicio', 
    pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
