import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
})
export class CarrouselComponent implements OnInit{
  loading: boolean = false;
  listaLibros: Libro[] = [];
  index = 0;

  constructor(private apiService: APIService, private router: Router){ 
    
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
            listaAux.push(results[i]);
          }
        }
        listaAux.sort((a,b) => b.cantVentas - a.cantVentas);
        this.listaLibros= listaAux.slice(0,5);
        this.loading= false;
      })
    }

    verInformacionDetallada(id: string) {
      this.router.navigate([`/inicio/libro_detalle/${id}`]);
    }
  }




