import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn,Router, RouterStateSnapshot } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const usersGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean | Observable<boolean> => {
  const router: Router = inject(Router);
  const uService: ClienteService = inject(ClienteService);
  const actual = uService.obtenerUsuarioActual();

  if (actual) {
    return uService.getCliente(actual).pipe(
      map(cliente => {
        if (cliente.rol !== 'USER' && cliente.rol !== 'ADMIN') {
          router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  } else {
    alert('Debe iniciar sesión');
    router.navigate(['/login']);
    return false;
  }
};
