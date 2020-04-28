
const Operacao = require("./Operacao")

class AtivoFinanceiro {
  nome
  operacoes = []
  valorCotacao = 0
  patrimonio =   0

  constructor(nome, valorCotacao = 0){
    this.nome = nome
    this.valorCotacao = valorCotacao

    
  }
  pegarOperacoes = () => this.operacoes
  buscarValorCotacao(){
    let valorCotacao = 0
  }


  calcularCustoDeCompra(){
    return this.qtdAtivosEmPosse() * this.calcularMediaCompra();
  }

  calcularMediaCompra() {
  
    return this.totalCompra() / this.qtdAtivosComprados()
  }
  calcularMediaVenda()
  {
   
    return isNaN( this.totalVenda() / this.qtdAtivosVendidos() ) ? 0 :   this.totalVenda() / this.qtdAtivosVendidos()
  }
  valorPatrimonial(){
    return this.qtdAtivosEmPosse() * this.calcularMediaCompra()
  }
  valorPatrimonialCotacao( valorCotacao ){
    return this.qtdAtivosEmPosse() * ( valorCotacao || this.valorCotacao ) 
  }
  /** lucro não realizado */
  lucroRelativoNaoRealizado( valorCotacao ){
  
    return this.valorPatrimonialCotacao( valorCotacao || this.valorCotacao ) / this.valorPatrimonial() *100 -100
  }
  /** lucro não realizado */
  lucroNaoRealizado( valorCotacao ){
  
    return this.valorPatrimonialCotacao( valorCotacao  || this.valorCotacao ) - this.valorPatrimonial() 
  }
  lucroRealizado( ){
    let lr = this.calcularMediaVenda() * this.qtdAtivosVendidos() - this.calcularMediaCompra() * this.qtdAtivosVendidos()
    if( isNaN(lr)) { lr = 0}

    return lr
  }
  lucroRealizadoRelativo( ){
    
    return this.lucroRealizado() / this.valorPatrimonial() *100
  }
  lucroTotal(){
    return this.lucroRealizado() + this.lucroNaoRealizado()
  }
  lucroTotalRelativo(){
    if( !this.valorCotacao ){
      console.warn("Atenção não foi passado o preço da cotação, então não será possivel calcular o lucro realizado")
    }

    return ( this.lucroRealizado() + this.lucroNaoRealizado() ) / this.valorPatrimonial() * 100
  }
  totalCompra(){
    return this.operacoes.reduce( ( acumulador , {valor , tipo , qtd} ) => {
      let resultado = ( tipo == "C") ? valor * qtd : 0
      return acumulador +  resultado
    } , 0) 
  }
  
  totalVenda(){
    return this.operacoes.reduce( ( acumulador , {valor , tipo , qtd} ) => {
      let resultado = ( tipo == "V") ? valor * qtd : 0
      return acumulador +  resultado
    } , 0) 
  }
 calcularDiferencaTotalCompraVenda(){
   return Math.abs( this.totalVenda() - this.totalCompra()  )
 }
  qtdAtivosComprados()
  {
    let qtd =  this.operacoes.reduce( ( acumulador , atual ) => {
      let valor = ( atual.tipo == "C") ? atual.qtd : 0
      return acumulador +  valor
    } , 0)

    return Math.abs(qtd)
  }
  qtdAtivosVendidos()
  {
    let qtd =  this.operacoes.reduce( ( acumulador , atual ) => {
      let valor = ( atual.tipo == "V") ? atual.qtd : 0
      return acumulador +  valor
    } , 0)

    if( isNaN( qtd ) ) return 0

    return Math.abs(qtd  )
  }
  qtdAtivosEmPosse()
  {

    return Math.abs(this.qtdAtivosComprados() - this.qtdAtivosVendidos())
  }
  qtd(){
    return this.qtdAtivosEmPosse()
  }
}

module.exports = AtivoFinanceiro




  
  // /**Relativo */
  // calcularLucroCotacao( precoAtual ){
  //   let qtd = this.qtdAtivosEmPosse() || 1
  //   return ( ( precoAtual * qtd ) / ( qtd * this.calcularMediaCompra()  ) * 100 ) -100
  // }
  // calcularLucroMedioVendas( )
  // {
  //  let p_m_compra =  this.calcularMediaCompra() * this.qtdAtivosComprados()
  //  let venda = this.calcularMediaVenda() * this.qtdAtivosComprados()

  //  let resultado = venda - p_m_compra;

  //  return ( resultado ) 
  // }
  // /**certo */
  // calcularLucroMedioOperacoesRelativo( ) {
  //   return this.calcularLucroMedioVendas() / this.totalCompra() *100
  
  //  }
  // calcularLucroOperacoes(){
  //   return  this.calcularLucroMedioVendas()
  // }
  // calcularLucroOperacoesRelativo(){
  //   return  ( this.totalVenda() - this.totalCompra() ) /100
  // }


