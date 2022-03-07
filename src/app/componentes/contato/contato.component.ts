import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/Cliente';
import { ContatoService } from 'src/app/servicos/contato.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent implements OnInit {

  form: FormGroup

  // id: string | undefined

  constructor(private fb:FormBuilder,
              private serviceContato:ContatoService) {

    this.form = this.fb.group({
      cliNome:['',[Validators.required, Validators.minLength(7)]],
      cliEmail:['',[Validators.required]],
      cliTelefone:['',[Validators.required]],
      cliOpcao:['',[Validators.required]],
      cliMensagem:['',[Validators.required]]

    })
   }

  ngOnInit(): void {

  }

  cadastrarContato(){
    const CONTATO: Cliente = {
      cliNome: this.form.value.cliNome,
      cliEmail: this.form.value.cliEmail,
      cliTelefone: this.form.value.cliTelefone,
      cliOpcao: this.form.value.cliOpcao,
      cliMensagem: this.form.value.cliMensagem
    }
    console.log(CONTATO)
      this.serviceContato.addCliente(CONTATO).then(()=>{
        console.log("As informações foram enviadas! ")
        this.form.reset()
      }, error=>{
        console.log(error)
      })

    }

  }




