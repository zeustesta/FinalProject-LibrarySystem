import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const usersGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const usuarioActual = localStorage.getItem('usuarioActual');

  if (usuarioActual == undefined) {
    alert('Debe iniciar sesión primero!');
    router.navigate(['/inicio/login']);
    return false;
  } else if(usuarioActual != null) {
    let usuarioParseado = JSON.parse(usuarioActual);
    if (usuarioParseado.rol == 'usuario' || usuarioParseado.rol == 'admin') {
      return true
    }
  }
  return true;
};
