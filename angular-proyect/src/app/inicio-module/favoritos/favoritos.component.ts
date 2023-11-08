import { Component } from '@angular/core';
import { CartFavsService } from 'src/app/service/cart-favs.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  

  constructor(private uService: UsuariosService, private fService: CartFavsService){
    
  }

  
}
