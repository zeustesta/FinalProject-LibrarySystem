import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit{
  listaLibros: Libro[] = [];

  constructor(private apiService: APIService){
    
  }
  ngOnInit(): void {
    this.listaLibros = this.apiService.retornarLibros();
  }
}
