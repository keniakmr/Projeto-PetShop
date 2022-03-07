import { Cliente } from './../models/Cliente';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { orderBy } from 'firebase/firestore';
import { Subject } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private firebaseAngular:AngularFirestore) { }

  //Aqui está adicionando um novo registro do form contato
  addCliente(Cliente:Cliente):Promise<any>{
    return this.firebaseAngular.collection('cliente').add(Cliente)
  }


}
