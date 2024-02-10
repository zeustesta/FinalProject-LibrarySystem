import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  loading: boolean = false;
  listaLibros: Libro[] = [];

  constructor(private aService: APIService) {
    this.getListaLibros();
  }

  getListaLibros() {
    this.loading = true;
    this.aService.getLibros().subscribe((data: Libro[]) => {
      this.listaLibros = data;
      setTimeout(() => {
        this.loading = false;
      }, 800)
    })
  }
}
