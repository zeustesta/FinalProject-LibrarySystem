import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const uService: ClienteService = inject(ClienteService); 
  const actual = uService.obtenerUsuarioActual(); 

  if (actual) {
    return uService.getCliente(actual).pipe(
      map(cliente => {
        if (cliente.rol  !== 'ADMIN') {
          alert('Solo administradores!');
          router.navigate(['/inicio']);
          return false;
        }
        return true;
      })
    );
  } else {
    alert('Debe iniciar sesión primero!');
    router.navigate(['/login']);
    return false;
  }
};