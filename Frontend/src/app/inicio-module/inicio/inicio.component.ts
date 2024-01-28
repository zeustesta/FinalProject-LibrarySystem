import { Component } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  listaLibros: Libro[] | null = null;

  constructor(private aService: APIService) {
    this.getListaLibros();
  }

  getListaLibros() {
    this.aService.getLibros().subscribe((data: Libro[]) => {
      this.listaLibros = data;
    })
  }
}
