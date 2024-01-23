import { Injectable } from '@angular/core';
import { Venta } from '../interfaces/plantillaVenta';
import { UsuariosService } from './usuarios.service';
import { v4 as uuidv4 } from 'uuid';
import { APIService } from './api.service';
import { StorageService } from './storage.service';
import { EstadoVenta } from '../utils/enum';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  listaVentas: Venta[] = [];

  constructor(private uService: UsuariosService, private aService: APIService, private storage: StorageService) {
    if(storage.getItem('ventasData') == null){
      storage.setItem('ventasData', this.listaVentas);
    }else{
      this.listaVentas = storage.getItem('ventasData');
    }
  }
  
  agregarVenta(idUsuario: string, idsLibros: string[], fecha: Date){
    const newVenta = {
      idVenta: uuidv4(),
      idUsuario: idUsuario,
      fechaCompra: fecha,
      idsLibros: idsLibros,
      total: this.calcularTotal(idsLibros),
      estado: EstadoVenta.PENDIENTE
    }

    this.listaVentas.push(newVenta);
    this.storage.updateItem('ventasData', this.listaVentas);
  }

  calcularTotal(arrayIds: string[]) {
    let total: number = 0;
    for(let idLibro of arrayIds){
      let aux = this.aService.retornarPrecio(idLibro);
      if(aux != null){
        total = total + aux;
      }
    }
    return total;
  }

  getVentas(){
    return this.listaVentas;
  }

  confirmarCompra(idVenta: string){
    const indexVenta = this.listaVentas.findIndex((v) => v.idVenta === idVenta);

    if(indexVenta != null){
      this.listaVentas[indexVenta].estado = EstadoVenta.CONFIRMADA
    }
  }

  rechazarCompra(idVenta: string){
    const indexVenta = this.listaVentas.findIndex((v) => v.idVenta === idVenta);

    if(indexVenta != null){
      this.listaVentas[indexVenta].estado = EstadoVenta.RECHAZADA
    }
  }
}
