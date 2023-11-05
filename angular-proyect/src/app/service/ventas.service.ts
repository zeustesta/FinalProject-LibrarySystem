import { Injectable } from '@angular/core';
import { Venta } from '../interfaces/plantillaVenta';
import { UsuariosService } from './usuarios.service';
import { v4 as uuidv4 } from 'uuid';
import { Libro } from '../interfaces/plantillaLibro';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  listaVentas: Venta[] = [];

  constructor(private uService: UsuariosService, private aService: APIService) {
    
  }
  
  agregarVenta(idUsuario: String, idsLibros: number[], fecha: Date){
    const newVenta = {
      idCompra: uuidv4(),
      idUsuario: idUsuario,
      fechaCompra: fecha,
      idsLibros: idsLibros,
      total: this.calcularTotal(idsLibros)
    }
  }

  calcularTotal(arrayIds: number[]): number{
    let total: number = 0;
    for(let idLibro of arrayIds){
      let libro: Libro | null = this.aService.buscarPorId(idLibro);
      if(libro != null){
        total = total + libro.precio;
      }
    }
    return total;
  }
}
