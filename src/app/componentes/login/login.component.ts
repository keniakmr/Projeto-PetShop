import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder,FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AutorizacaoService } from './../../servicos/autorizacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup

  constructor(private auth:AngularFireAuth,
              private fb:FormBuilder,
              private router:Router,
              private autorizacao:AutorizacaoService) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  fazerLogin(){
    //Usado na primeira vez para criar os login
    //this.auth.createUserWithEmailAndPassword(this.form.value.email,this.form.value.senha)
    this.auth.signInWithEmailAndPassword(this.form.value.email,this.form.value.senha)
    .then(user=>{
      this.autorizacao.autorizar()
      this.router.navigate(['/home'])
    })
    .catch(error=>{
      console.log(error)
      this.autorizacao.deslogar()
      this.router.navigate(['/home'])
    })
  }

}
