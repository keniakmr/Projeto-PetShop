import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/servicos/produto.service';
import { Produto } from 'src/app/models/Produto';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent implements OnInit {

  // instanciamos o modelo e dizemos que é um array deste modelo, e inicializamos
  // com um vetor vazio

  itens: Produto[] = []

  constructor(private serviceProduto:ProdutoService) { }

  ngOnInit(): void {
    this.exibeItens()
  }

  exibeItens(){
    // dentro do resultado vem todos os atributos, então logo em baixo faço um
    // forEach para pegar somente o que eu preciso
    // o doc que uso em baixo é o que aparece no console log (payload: DocumentChange) no console
    //e o payload é uma propriedade do doc, os 3 pontinhos(...) que aparece quer dizer
    // o id e os outros atributos
    this.serviceProduto.listarProduto().subscribe(doc =>{
      console.log(doc)
      this.itens = []
      doc.forEach((element:any) => {
    //adicionar dentro de um vetor atraves do push todos os atributos do funcionario
        this.itens.push({
          id:element.payload.doc.id,
                   ...element.payload.doc.data()})

      });
    })
    console.log(this.itens)
  }

  excluir(id:any){
    this.serviceProduto.excluirProduto(id).then(()=>{
      console.log('Produto foi excluído')
    }, error =>{
      console.log(error)
    })
  }


  editar(produto:Produto){
    this.serviceProduto.exibeProdutoEdit(produto)
  }
}

