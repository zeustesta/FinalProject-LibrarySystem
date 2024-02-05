import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn,Router, RouterStateSnapshot } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const usersGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean | Observable<boolean> => {
  const router: Router = inject(Router);
  const uService: UsuariosService = inject(UsuariosService);
  const actual = uService.obtenerUsuarioActual();

  if (actual) {
    return uService.getCliente(actual).pipe(
      map(cliente => {
        if (cliente.rol !== 'USER' && cliente.rol !== 'ADMIN') {
          console.log('Verificando si es algo');
          router.navigate(['/inicio/login']);
          return false;
        }
        return true;
      })
    );
  } else {
    alert('Debe iniciar sesión');
    router.navigate(['/inicio/login']);
    return false;
  }
};
