export class Produto{
	//o ponto de Interrogação significa que id pode ser nulo
 // foi colocado para não dar
//  erro no cadastro-produtocompont.html na constante variavel PRODUTO

	id?:string
  prodNome:string
	prodValor:string
  prodQuant:string
  prodTam:string
  prodEspecie:string
  prodGenero:string
	prodFoto:string

	constructor(){
		this.id = ""
    this.prodNome = ""
		this.prodValor = ""
    this.prodQuant = ""
    this.prodTam = ""
    this.prodEspecie = ""
    this.prodGenero = ""
		this.prodFoto = ""
	}
}
