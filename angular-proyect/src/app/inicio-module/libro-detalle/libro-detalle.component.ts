import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../../interfaces/plantillaLibro';
import { APIService } from '../../service/api.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { CartFavsService } from 'src/app/service/cart-favs.service';
import { TmplAstIdleDeferredTrigger } from '@angular/compiler';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css'],
})

export class LibroDetalleComponent implements OnInit {
  libro: Libro | null = null;

  constructor(private route: ActivatedRoute, private apiService: APIService, private uService: UsuariosService, private cfService: CartFavsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) =>{
     const idParam = params.get('idLibro');
     if(idParam !== null){
      this.libro = this.apiService.buscarPorId(parseInt(idParam));
     }
    });
  }

  addToCart(libro: Libro){
    if(this.uService.obtenerUsuarioActual() !== null && libro !== null){
      if(libro.stock > 0){
        this.cfService.agregarAlCarrito(libro);
        alert('Libro añadido al carrito');
      }else{
        alert('Ya no quedan libros disponibles')
      }
    }else{
      alert('Debe estar logueado');
    }
  }

  addToFavs(libro: Libro){
    if(this.uService.obtenerUsuarioActual() !== null && libro !== null){
      this.cfService.agregarToFavs(libro.idLibro);
      alert('Libro agregado a favoritos');
    }else{
      alert('Debe estar logueado');
    }
  }
}