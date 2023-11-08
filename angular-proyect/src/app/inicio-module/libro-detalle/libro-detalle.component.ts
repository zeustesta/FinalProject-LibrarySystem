import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../../interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { FavoritosService } from 'src/app/service/favoritos.service';
import { stringify } from 'uuid';


@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css'],
})

export class LibroDetalleComponent implements OnInit {
  libro: Libro | null = null;
  idActual: string | undefined;

  constructor(private route: ActivatedRoute, 
    private apiService: APIService, 
    private cService: CarritoService, 
    private uService: UsuariosService,
    private fService: FavoritosService) {
      this.idActual = this.uService.obtenerUsuarioActual()?.id;
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) =>{
     const idParam = params.get('idLibro');
     if(idParam !== null){
      this.libro = this.apiService.buscarPorId(parseInt(idParam));
     }
    });
  }

  addToCart(libro: Libro | null){
    if(this.uService.obtenerUsuarioActual() !== null && libro !== null){
      this.cService.agregarAlCarrito(libro);
      alert('Libro añadido al carrito!');
    }else{
      alert('Debe estar logueado');
    }
  }

  addToFavs(libro: Libro | null){
    if(this.idActual !== undefined && libro !== null){
      const key = prompt('A que lista desea agregar el libro?');
      this.fService.agregarALista(libro.idLibro, this.idActual, String(key));
      alert('Libro añadido al carrito!');
    }else{
      alert('Debe estar logueado');
    }
  }
}