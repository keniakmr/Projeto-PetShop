export class Cliente{
	//o ponto de Interrogação significa que id pode ser nulo
	id?:string
  cliNome:string
	cliEmail:string
  cliTelefone:string
  cliOpcao:string
  cliMensagem:string

	constructor(){
		this.id = ""
    this.cliNome = ""
		this.cliEmail = ""
    this.cliTelefone = ""
    this.cliOpcao = ""
    this.cliMensagem = ""

	}
}
