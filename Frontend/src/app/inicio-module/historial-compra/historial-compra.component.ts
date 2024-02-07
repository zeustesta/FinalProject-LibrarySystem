import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.component.html',
  styleUrls: ['./historial-compra.component.css']
})
export class HistorialCompraComponent {
  historial: any = [];
  iconoPrecio:boolean | null = null;
  iconoFecha:boolean | null = null;
  loading: boolean= false;

  constructor(private uService: UsuariosService){    this.iconoPrecio= null;
  }

  ngOnInit(): void {
    this.getHistorial();
  }

  getHistorial() {
    this.loading= true;
    const actual = this.uService.obtenerUsuarioActual();
    this.historial= [];

    this.uService.getHistorial(actual!).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].LibrosVendidos.length; j++) {
          const compra = {
            idLibro: data[i].LibrosVendidos[j].LibrosVenta['idLibro'],
            titulo: data[i].LibrosVendidos[j].LibrosVenta['titulo'],
            autor: data[i].LibrosVendidos[j].LibrosVenta['autor'],
            precio: data[i].LibrosVendidos[j].LibrosVenta['precio'],
            fechaCompra: data[i]['fechaCompra'],
            estado: data[i]['estado']
          }
          this.historial.push(compra);
        }
      }
      this.filterFechaLejanaACercana();
      setTimeout( () => {
        this.loading= false;
      },800)
    });
  }

  filterFechaCercanaALejana() {
    this.iconoFecha = true; // Ocultar el icono de orden descendente
    this.iconoPrecio= null;
    // Ordenar las compras por fecha de compra de más cercana a más lejana
    this.historial.sort((a: any, b: any) => new Date(b.fechaCompra).getTime() - new Date(a.fechaCompra).getTime());
  }
  
  filterFechaLejanaACercana() {
    this.iconoFecha = false; 
    this.iconoPrecio= null;
    // Ordenar las compras por fecha de compra de más lejana a más cercana
    this.historial.sort((a: any, b: any) => new Date(a.fechaCompra).getTime() - new Date(b.fechaCompra).getTime());
  }
  
  filterPrecioMayoraMenor() {
    this.iconoPrecio = true;
    this.iconoFecha= false;

    this.historial.sort((a: any, b: any) => b.precio - a.precio);
  }

  filterPrecioMenoraMayor() {
    this.iconoPrecio = false; // Mostrar el icono de orden ascendente
    this.iconoFecha= false;
  
    // Ordenar las compras por precio de menor a mayor
    this.historial.sort((a: any, b: any) => a.precio - b.precio);
  }  
}
  

