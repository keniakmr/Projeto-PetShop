import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/servicos/produto.service';
import { Produto } from 'src/app/models/Produto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

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
//adicionar dentro de um vetor atraves do push todos os atributos do produto
        this.itens.push({
          id:element.payload.doc.id,
                   ...element.payload.doc.data()})

      });
    })
    console.log(this.itens)
  }

}
