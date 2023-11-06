import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})

export class FiltroComponent implements OnInit {
  generoSeleccionado: string | undefined;
  librosFiltrados: Libro[] = [];

  constructor(
    private route: ActivatedRoute,
    private libroService: APIService
  ) {}

  ngOnInit(): void {
    const genero = this.route.snapshot.paramMap.get('genero');
    if (genero !== null) {
      this.generoSeleccionado = genero;
      this.librosFiltrados = this.libroService.filtrarLibrosPorGenero(genero);
    }
  }
}
