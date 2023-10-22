import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { ListaLibrosComponent } from './Components/lista-libros/lista-libros.component';

const routes: Routes = [
  {path:'', component: InicioComponent},
  {path:'libros', component: ListaLibrosComponent},
  {path:'**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
