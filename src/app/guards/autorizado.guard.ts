import { AutorizacaoService } from './../servicos/autorizacao.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard implements CanActivate {

  constructor(private autorizado:AutorizacaoService,
              private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
// aqui nesta variavel já ficara armazenado true ou false
      const usuarioLogado = this.autorizado.obterLoginStatus()
//se cair na linha de baixo é true senão é false
    if(usuarioLogado) return usuarioLogado
    this.router.navigate(['/login'])
// se não tiver logado é false
    return false
    }



}
