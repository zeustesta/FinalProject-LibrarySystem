import { Injectable } from '@angular/core';
import { Venta } from '../interfaces/plantillaVenta';
import { UsuariosService } from './usuarios.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  listaVentas: Venta[] = [];

  constructor(private uService: UsuariosService) {
    
  }
  
  
}
