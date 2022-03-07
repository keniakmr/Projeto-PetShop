import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  autorizacao = false

  constructor() { }

  autorizar(){
    //Autoriza o login no firebase
    localStorage.setItem('login',"sim")
  }

  deslogar(){
    localStorage.clear()
  }
  //!! transforma a variável login em booblean
  //Se no localstorage tiver o login, retorna true
  //Se não houver a variável login no localstorage, retorna false
  obterLoginStatus = ()=> !!localStorage.getItem('login')


  }
