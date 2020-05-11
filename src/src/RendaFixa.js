
import Operacao from "./Operacao"
import AtivoFinanceiro from "./AtivoFinanceiro"

class RendaFixa extends AtivoFinanceiro{
  
  atrelacao = "SELIC"
  jurosMedio = this.calcularMediaJuros()

  constructor(nome,cotacao,atrelacao){
    super(nome,cotacao,"Renda Fixa")
    this.atrelacao = atrelacao
  }
  calcularTempoPassadoEmAnos(){
    // media de tempo em anos
    // ex 10 ativos com 5  % e 3 anos 5 ativos com 10% e media de 15 anos
  }

  calcularMediaJuros () {

    let qtdCompras = 0

    
    let jurosTotal = this.operacoes.reduce( ( acumulador , {juros , tipo, qtd  } ) => {
      let resultado = ( tipo == "C") ? juros * qtd : 0
      
      if( tipo == "C") qtdCompras += qtd  

      return acumulador +  resultado
    } , 0) 

    return jurosTotal / qtdCompras
  }
  valorMedioCompraComJuros(){
    return this.calcularMediaCompra() +  this.calcularMediaJuros() 
  }
  //

  lucroRealizado( qtd ){
     
    if( !qtd ){
      qtd = this.qtdAtivosVendidos() + this.qtdAtivosRealizados()
      
    }
    
    let lr = ( this.calcularMediaJuros() * qtd ) 
    
    

    if( isNaN(lr)) { lr = 0}
    return lr 
  }
  
  lucroRealizadoRelativo( ){
    
    console.warn( "attt", this.qtdAtivosComprados() )
    let lucro = this.lucroRealizado() / ( this.valorPatrimonial( ) ) *100
    
    return isFinite( lucro ) ? lucro : 0
  }
  lucroTotal(){
    
    return this.lucroRealizado( this.qtdAtivosComprados() ) 
  }
  lucroTotalRelativo(){
    let lucro = ( this.lucroTotal() ) / ( this.valorPatrimonial( ) ) * 100
    return isFinite(lucro) ? lucro : 0
  }
  qtdAtivosRealizadosEVendidos(){
    return (this.qtdAtivosVendidos() + this.qtdAtivosRealizados())
  }
  calcularMediaVenda()
  {
    let media = this.totalVenda() / this.qtdAtivosRealizadosEVendidos()
    
    return isNaN( media ) ? 0 :   media 
  }

  totalVenda(){
    let total = this.operacoes.reduce( ( acumulador , {valor , tipo , qtd} ) => {
      let resultado = ( tipo == "V") ? valor * qtd : 0
      return acumulador +  resultado
    } , 0) 
    if( isNaN(total) || !total) total = 0
    

    return total + this.totalRealizados()
  }
  


  calcularMediaRealizados()
  {
   
    return this.totalRealizados() / this.qtdAtivosRealizados()
  }

  totalRealizados(){
    return this.operacoes.reduce( ( acumulador , {valor , tipo , qtd} ) => {
      
      let resultado = ( tipo == "R") ? valor * qtd : 0
      return acumulador +  resultado
    } , 0) 
  }

  qtdAtivosRealizados()
  {
    let qtd =  this.operacoes.reduce( ( acumulador , atual ) => {
      let valor = ( atual.tipo == "R") ? atual.qtd : 0
      return acumulador +  valor
    } , 0)
    return Math.abs(qtd)
  }
}

export default RendaFixa