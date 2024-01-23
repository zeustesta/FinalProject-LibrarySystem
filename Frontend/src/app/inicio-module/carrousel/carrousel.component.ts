import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';


@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
})
export class CarrouselComponent implements OnInit{
  loading: boolean = false;
  listaLibros: Libro[] = [];
  index= 0;

  constructor(private apiService: APIService){ 
    
  }

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(){
    this.loading = true;
    this.apiService.getLibros().subscribe((data) => {
        let results = data;
        let listaAux: Libro []=[];
        for(let i = 0; i < results.length; i++){
          if(results[i].autor[0] !== undefined){
            // this.apiService.cargarLibro(results[i].id, results[i].title, results[i].authors[0].name, results[i].formats["image/jpeg"],listaAux);
          }
        }
        this.listaLibros= this.apiService.getTop5(listaAux);
        console.log(this.listaLibros);
        this.loading= false;
      })
    }
  }




