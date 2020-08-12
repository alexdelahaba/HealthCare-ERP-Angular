import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class VerificaTokenGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, public router: Router) {}
  canActivate(): Promise<boolean> | boolean {
    let token = this.usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expiro = this.saberExpiracionToken(payload.exp);
    if (expiro) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenovar(payload.exp);
  }

  verificaRenovar(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();
      let cuatroHorasEnMs = 4 * 60 * 60 * 1000;

      ahora.setTime(ahora.getTime() + cuatroHorasEnMs);

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renuevaToken().subscribe(
          (resp: any) => {
            resolve(true);
          },
          (err) => {
            reject(false);
            this.router.navigate(['/login']);
          }
        );
      }

      resolve(true);
    });
  }

  saberExpiracionToken(fechaExp: number) {
    let ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }
}
