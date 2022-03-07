import { Produto } from './../../models/Produto';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/servicos/produto.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { read } from 'fs';
import { url } from 'inspector';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
//criada variavel form do tipo form-group
//e inicializar a vaviavel logo abaixo atraves do this pelo parametro chamado de fb(formbuilder)
  form: FormGroup

  id: string | undefined

  tituloForm: string = "Cadastrar  Produto"

// variavel para imagem e outra para o caminho que vai armazenar  no storage
  imagem: any = ""
  urlImagem: any = ""

  constructor(private fb:FormBuilder,
              private serviceProduto:ProdutoService) {

    this.form = this.fb.group({
      prodNome:['',[Validators.required, Validators.minLength(10)]],
      prodValor:['',[Validators.required]],
      prodQuant:['',[Validators.required]],
      prodTam:['',[Validators.required]],
      prodEspecie:['',[Validators.required]],
      prodGenero:['',[Validators.required]],
      prodFoto:['']

    })
   }

// passa o valor null para a variavel imgvalue
  imgValue = '';
 // o conteudo do produto edit fica armazendo dentro do resultado

  ngOnInit(): void {
    this.serviceProduto.getProdutoEdit().subscribe(resultado =>{
        this.id = resultado.id
        this.imgValue = resultado.prodFoto
        this.tituloForm = "Alterar Produto"
        this.form.patchValue({
        prodNome: resultado.prodNome,
        prodValor: resultado.prodValor,
        prodQuant: resultado.prodQuant,
        prodTam: resultado.prodTam,
        prodEspecie: resultado.prodEspecie,
        prodGenero: resultado.prodGenero,
        prodFoto: resultado.prodFoto
      })
    })
  }

// usado para controlar o controle da imagem
  controlImagem = 0

  carregarImagem(event:any){
    this.controlImagem = 1
// variavel arquivo para armazenar os arquivos que foram selecionados, o evento abaixo
// quer dizer que foi acionado um evento
    let arquivo = event.target.files
    let reader = new FileReader()

//Indice zero recebe a primeira foto
    reader.readAsDataURL(arquivo[0])
    reader.onloadend = ()=>{
// gerar um nome novo para não correr o risco de ter dois arquivos iguais,
// por isto gera com data e horario,
//  o console abaixo é para mostrar no console o conteudo da imagem q é transformada em outro tipo de dado
      console.log(reader.result)
      this.imagem = reader.result
      this.serviceProduto.carregarImagem("produto" + Date.now(),
      reader.result).then(resultado =>{
        console.log(resultado)
        this.urlImagem = resultado
      })
   }
  }
  insereProduto(){
    if (this.id === undefined){
      //insere o produto
      this.cadastrarProduto()
    }else{
      //edita o produto
      this.editarProduto(this.id)
    }
  }
  cadastrarProduto(){
    const PRODUTO: Produto = {
      prodNome: this.form.value.prodNome,
      prodValor: this.form.value.prodValor,
      prodQuant: this.form.value.prodQuant,
      prodTam: this.form.value.prodTam,
      prodEspecie: this.form.value.prodEspecie,
      prodGenero: this.form.value.prodGenero,
      prodFoto: this.urlImagem
    }
    console.log(PRODUTO)
      this.serviceProduto.addProduto(PRODUTO).then(()=>{
        console.log("Produto adicionado no banco de dados")
        this.form.reset()
      }, error=>{
        console.log(error)
      })

    }

    editarProduto(id:string){
      let imgEdit = ''
      if (this.controlImagem == 0) {
        imgEdit = this.imgValue
      }else{
        imgEdit = this.urlImagem
      }
  // instanciando modelo produto, foi criado a variavel tipo constante PRODUTO
      const PRODUTO: any = {
        prodNome: this.form.value.prodNome,
        prodValor: this.form.value.prodValor,
        prodQuant: this.form.value.prodQuant,
        prodTam: this.form.value.prodTam,
        prodEspecie: this.form.value.prodEspecie,
        prodGenero: this.form.value.prodGenero,
        // prodFoto: this.form.value.prodFoto
        prodFoto: this.urlImagem
      }
      this.serviceProduto.editarProduto(id,PRODUTO).then(()=>{
        this.form.reset({prodTam:''})
        this.form.reset({prodEspecie:''})
        this.form.reset({prodGenero:''})
        this.tituloForm = "Cadastrar Produto"
// reseta a variavel para o valor zero
        this.controlImagem = 0
        this.id = undefined
        console.log('Produto alterado')
      }, error =>{
        console.log(error)
      })
    }

  }




