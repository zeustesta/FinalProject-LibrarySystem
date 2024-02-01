import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const uService: UsuariosService = inject(UsuariosService); 
  const actual = uService.obtenerUsuarioActual(); 

  if(actual === undefined){
    alert('Debe iniciar sesión primero!');
    router.navigate(['/inicio/login']);
    return false;
  }else if(actual !== null){
    uService.getCliente(actual).subscribe((usuario) => {
      if(usuario.rol !== 'admin'){
        alert('Solo administradores!');
        return false;
      }else {
        return true;
      }
    })
  }
  return true;
};