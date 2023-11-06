import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../../interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';

interface RouteParams {
  id: string;
}

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LibroDetalleComponent /*implements OnInit*/ {
  routeParams!: RouteParams;
  idDetail!: string;
  listaLibros: Libro[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: APIService
  ) {

  }

  /*
  ngOnInit(): void {
    /*this.idDetail = this.route.snapshot.paramMap.get('id')!;
    this.listaLibros = this.apiService.retornarLibros();

    this.listaLibros = this.listaLibros.find(
      (libro: Libro) => libro.id.toString() === this.idDetail
    );
  }*/

}