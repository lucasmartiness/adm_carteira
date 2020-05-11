  const TipoOperacao = {
  Comprar : "C",
  Vender:"V",
  Jsp: "J",
  Dividendos:"D",
  Resgate:"R"
}

class Operacao{
  nomeAtivo
  id
  valor
  data
  tipo
  qtd
  prazo
  juros
 
  constructor(  nomeAtivo , valor , data , tipo , qtd , prazo , juros , id ){
    this.nomeAtivo = nomeAtivo
    this.id = id || Math.random()
    this.valor = valor
    this.data = data || new Date()
    //console.log(data)
    this.tipo = tipo
    this.qtd  = qtd
    this.juros  = this.calcularJuros( juros,  this.calcularQtdAnos(data,prazo) )
    this.jurosAA = juros
    this.qtdTempoAnos = this.calcularQtdAnos(data,prazo)
    this.prazo = prazo
  }
  static Resgate(nome , qtd , juros = null ,data ){
    return new Operacao( nome , null , data  , TipoOperacao.Resgate  , qtd , null,  juros )
  
  }
  calcularQtdAnos( data , prazo  ){
    if( data != null && prazo != null){
      return  new Date( prazo ).getFullYear() - new Date( data ).getFullYear()
    }
    return 0
  }
  calcularJuros( juros ,qtdAnos){
    if(qtdAnos > 0)
      return juros * qtdAnos
    else
      return 0
  }
}


export  {
  Operacao,
  TipoOperacao
}