import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {Produto } from '../models/Produto';

import { orderBy } from 'firebase/firestore';
import { Subject } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
    //O subject permite fazer um subscribe dentro da variável, ou seja,
    private produtoEdit = new Subject<any>()

    storageRef = firebase.app().storage().ref()


  constructor(private firebaseAngular:AngularFirestore) { }

  //Aqui está adicionando um  novo produto
  addProduto(produto:Produto):Promise<any>{
    return this.firebaseAngular.collection('produto').add(produto)
  }

  listarProduto():Observable<any>{
    // return this.firebaseAngular.collection('produto',ordem=> ordem.orderBy('nome')).snapshotChanges()
    return this.firebaseAngular.collection('produto').snapshotChanges()
  }

  excluirProduto(id:string):Promise<any>{
    return this.firebaseAngular.collection('produto').doc(id).delete()
  }
//é a mesma mostra funcionarios
   exibeProdutoEdit(produto:Produto){
    this.produtoEdit.next(produto)
  }

  getProdutoEdit():Observable<Produto>{
    return this.produtoEdit.asObservable()
  }

  editarProduto(id:string,produto:any){
    return this.firebaseAngular.collection('produto').doc(id).update(produto)
  }


  async carregarImagem(nome:string, imgBase64:any){
    try{
      //Cria automaticamente a pasta imgFoto, caso ela não exista
      let resultado = await this.storageRef.child("imgFoto/" + nome).putString(imgBase64,'data_url')
      console.log(resultado)
      return await resultado.ref.getDownloadURL()
    }catch(err){
      return null
    }
  }

}
