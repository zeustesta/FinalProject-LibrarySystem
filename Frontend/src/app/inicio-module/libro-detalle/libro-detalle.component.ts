import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../../interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css'],
})

export class LibroDetalleComponent implements OnInit {
  libro!: Libro;

  constructor(private route: ActivatedRoute, private apiService: APIService, private uService: UsuariosService) {
    this.getLibro();
  }

  ngOnInit(): void {
    
  }

  getLibro() {
    this.route.paramMap.subscribe((params) =>{
      const idParam = params.get('idLibro');
      if(idParam !== null){
        this.apiService.getLibro(idParam).subscribe((data) => {
          this.libro = data;
        })
      }
    });
  }

  addToCart(idLibro: string) {
    const actual = this.uService.obtenerUsuarioActual();

    if(actual !== null){
      this.uService.postCart(actual, idLibro).subscribe();
      alert('Libro agregado correctamente');
    }else{
      alert('Debe iniciar sesion primero');
    }
  }

  addToFavs(idLibro: string) {
    const actual = this.uService.obtenerUsuarioActual();

    if(actual !== null){
      this.uService.postFav(actual, idLibro).subscribe();
      alert('Libro agregado correctamente');
    }else{
      alert('Debe iniciar sesion primero');
    }
  }
}