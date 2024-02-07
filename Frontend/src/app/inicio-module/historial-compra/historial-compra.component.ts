import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.component.html',
  styleUrls: ['./historial-compra.component.css']
})
export class HistorialCompraComponent {
  historial: any = [];
  icono:boolean = false;
  loading: boolean= false;

  constructor(private uService: UsuariosService){}

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
          this.icono= false;
        }
      }
      setTimeout( () => {
        this.loading= false;
      },800)
    });
  }

  filterPrecioMayoraMenor() {
    this.icono = true;
  
    // Filtrar las compras con precio mayor que 0
    const comprasFiltradas = [];
    for (let i = 0; i < this.historial.length; i++) {
      if (this.historial[i].precio > 0) {
        comprasFiltradas.push(this.historial[i]);
      }
    }
  
    // Ordenar las compras filtradas por precio de mayor a menor
    comprasFiltradas.sort((a, b) => b.precio - a.precio);
  
    // Actualizar el historial con las compras filtradas y ordenadas
    this.historial = comprasFiltradas;
  }
}
  

