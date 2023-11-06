import { Injectable } from '@angular/core';
import { Venta } from '../interfaces/plantillaVenta';
import { UsuariosService } from './usuarios.service';
import { v4 as uuidv4 } from 'uuid';
import { Libro } from '../interfaces/plantillaLibro';
import { APIService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  venta1 = {
    idVenta: uuidv4(),
    idUsuario: this.uService.listaUsuarios[1].id,
    fechaCompra: new Date(),
    idsLibros: [145, 132, 105],
    total: this.calcularTotal([145, 132, 105])
  };

  listaVentas: Venta[] = [this.venta1];

  constructor(private uService: UsuariosService, private aService: APIService, private storage: StorageService) {
    
  }
  
  agregarVenta(idUsuario: String, idsLibros: number[], fecha: Date){
    const newVenta = {
      idVenta: uuidv4(),
      idUsuario: idUsuario,
      fechaCompra: fecha,
      idsLibros: idsLibros,
      total: this.calcularTotal(idsLibros)
    }

    this.listaVentas.push(newVenta);
    this.storage.updateItem('ventasData', this.listaVentas);
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

  getVentas(){
    return this.listaVentas;
  }
}
