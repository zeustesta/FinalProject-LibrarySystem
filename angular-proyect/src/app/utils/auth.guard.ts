import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const usuarioActual = localStorage.getItem('usuarioActual');

  if (usuarioActual == undefined) {
    alert('Debe iniciar sesión primero!');
    router.navigate(['/inicio/login']);
    return false;
  } else if(usuarioActual != null) {
    const usuarioActualParseado = JSON.parse(usuarioActual);

    if (usuarioActualParseado.email != 'admin@gmail.com') {
      alert('Solo administradores!');
      router.navigate(['/inicio/login']);
      return false;
    }
  }
  return true;
};
