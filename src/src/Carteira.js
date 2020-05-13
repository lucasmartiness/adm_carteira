import RendaFixa from './RendaFixa'
import RendaVariavel from './RendaVariavel'
import  {Operacao,TipoOperacao}  from './Operacao'
import { ObterCDI , ObterSELIC, ObterIBOV, ObterIPCA,ObterCotacao  }  from './Mercado'

import data from './../data/data'
 


const TipoAtivo = {
  
  RENDA_FIXA : true,
  RENDA_VARIAVEL : false
}

class Carteira
{
  id = 0
  RendaFixa = []
  RendaVariavel = []
  RendaTotal = () => [...this.RendaVariavel , ...this.RendaFixa]
  TodosAtivos = () => this.RendaTotal()
  dinheiro = 0
  patrimonio = this.valorPatrimonial()
  nome = ""
  proporcoes = []
  listaOperacoes = []
  listaValorPatrimonialHistorico = []
  qtdOperacoes  = 0
  constructor( id , nome )
  {
    this.id = id
    this.nome = nome

  }

   /**
   * adicionar um ativo de renda fixa e evita que dois ativos com o mesmo nome exemplo ITSA3 sejam adicionados
   * e adiciona uma operação
   */
  adicionarAtivo(  operacao , rendaFixa = true , cotacao = 0 , atrelacao = "SELIC")
  {
    /** */
    
    this.listaValorPatrimonialHistorico.push( 
      {
      vp : this.valorPatrimonial(),
      lucro: this.lucroCarteiraRealizadoRelativo() ,
      lucroProvisorio: this.lucroProvisorioTotalRelativo() 
    })
  
    this.listaOperacoes.sort( ( a , p ) => {
    
      return new Date( a.operacao.data )  - new Date(p.operacao.data)  
    } ) 
    
   
    this.listaOperacoes.push( { operacao  } )

    if( operacao.tipo == "C"){
      
      this.qtdOperacoes  += operacao.qtd

    }

    let ativoEncontrado = this.TodosAtivos().find( ( ativo ) => ativo.nome == operacao.nomeAtivo  )

    if( ativoEncontrado != null  )// foi encontrado um ativo então atualize ele adicionando uma operação
    {

        /** validar a quantidade de venda dos ativos */
        if( operacao.tipo == "V"){

          let encontrado = this.ObterAtivoPeloNome(operacao.nomeAtivo)

          this.qtdOperacoes  -= operacao.qtd
          
          this.dinheiro += operacao.qtd * operacao.valor//+( operacao.valor * ( operacao.juros/100 || 1))
          
          //operacao.valor = encontrado.calcularMediaVenda() - encontrado.calcularMediaCompra() 
          // console.log( "ativo ","qtd ",operacao.qtd,
          //               "juros", operacao.juros,
          //               "valor",operacao.valor ,
          //               "lucro", operacao.valor / encontrado.calcularMediaCompra() *100 -100 )


          if( encontrado && operacao.qtd > encontrado.qtdAtivosEmPosse()  ){
            
            throw ("erro não é possivel remover mais ativos nessa operação, talves voce não tenha tantos ativosp para remover, tente remover menos")
            return 
          }
        } /** ./ validado venda dos ativos */

        /** validar a quantidade de venda dos ativos */
        else if( operacao.tipo == "R"){

          let encontrado = this.ObterAtivoPeloNome(operacao.nomeAtivo)
          this.qtdOperacoes -= operacao.qtd 
          

          this.dinheiro += encontrado.valorMedioCompraComJuros() * operacao.qtd
          
          console.log( "ativo ","qtd ",operacao.qtd,
                        "juros",  encontrado.calcularMediaJuros (),
                        "valor venda",operacao.valor  )


          if( encontrado && operacao.qtd > encontrado.qtdAtivosEmPosse()  ){
            
            throw ("erro não é possivel remover mais ativos nessa operação, talves voce não tenha tantos ativosp para remover, tente remover menos")
            return 
          }
        } /** ./ validado venda dos ativos */

        //foreach nos ativos [ renda fixa ou variavel ]
        const AlgoritmoAdcionador = ativo => 
        {
          if(ativo.nome == operacao.nomeAtivo )
          {          
            
            // INSERIR ATIVO           
            ativo.operacoes.push( operacao )
            
            // atualizar cotacao caso usuario passe como parametro
            if( cotacao != 0 ) ativo.valorCotacao = cotacao || ativo.valorCotacao || 0
          }

        }

      let ativoAtualizado = (rendaFixa) ? this.RendaFixa.forEach( AlgoritmoAdcionador )  : this.RendaVariavel.forEach( AlgoritmoAdcionador )

    }
    else /** ativo não encontrado, então adicione um ativo e depois adicione a sua primeira operacao */
    {
      /** é renda fixa ou variavel */
      let novoAtivo = (rendaFixa) ?  new RendaFixa( operacao.nomeAtivo,cotacao,atrelacao ) : new RendaVariavel( operacao.nomeAtivo,cotacao )
      
      // adicionar operacao no novo ativo
      novoAtivo.operacoes.push(operacao)
      // adicionar ativo na carteira
      let ativoCriado = (rendaFixa ) ? this.RendaFixa.push( novoAtivo ) : this.RendaVariavel.push( novoAtivo )
    }
  }

  valorPatrimonialTotal(){
  

    return this.valorPatrimonial() + this.dinheiro
  }
  valorPatrimonialRendaFixa(){
    return this.RendaFixa.reduce( ( acc , curr) => {
      return acc + curr.valorPatrimonial()
    },0)
  }
  valorPatrimonialRendaVariavel(){
    return this.RendaVariavel.reduce( ( acc , curr) => {
      return acc + curr.valorPatrimonial()
    },0)

  }
  /** total de dinheiro na carteira */
  valorPatrimonial(){
    return this.TodosAtivos().reduce( ( acc , curr) => {
      return acc + curr.valorPatrimonial()
    },0)

  }
  lucroCarteiraRealizado(){
    return this.TodosAtivos().reduce( ( acc , curr) => {
      let lucroR = !isNaN( curr.lucroRealizado() ) ? curr.lucroRealizado() : 0
      
      return acc + lucroR
    },0)

  }
  lucroCarteiraRealizadoRelativo(){

    
    return this.lucroCarteiraRealizado() / this.totalCompra  ()  * 100
  }
  lucroProvisorioTotal(){
    
    return this.TodosAtivos().reduce( ( acc , curr) => {
    
      return acc + curr.lucroTotal()
    },0)
  }
  lucroProvisorioTotalRelativo(){
    return this.lucroProvisorioTotal() / this.totalCompra () * 100
  }
   /** total de dinheiro valorizado na carteira */
  valorPatrimonialCotacao(){
    return this.TodosAtivos().reduce( ( acc , curr ) => {
      return acc + curr.valorPatrimonialCotacao( acc.valorCotacao )
    },0)
  }

  
  caixaRelativo(){
    return this.dinheiro / this.valorPatrimonial() * 100
  }


  
  historico()
  {
    let historico = []
    let count = 1

    this.OrdenarOperacao()
      
      this.listaOperacoes.forEach( 
        ({operacao}) => {

          if(count >= this.listaOperacoes.length - count){
            return 
          }
          //console.log(operacao.data)
          historico.push( { 
            nome : operacao.nomeAtivo,
            preco: operacao.valor,
            data : operacao.data , 
            qtd  : operacao.qtd , 
            tipo : operacao.tipo , 
            juros: operacao.juros,
            jurosAA: operacao.jurosAA,
            qtdTempoAnos: operacao.qtdTempoAnos,
            lucro: this.lucroProvisorioTotalRelativo(),
            vpa: this.listaValorPatrimonialHistorico[count].vp,
            lucro : this.listaValorPatrimonialHistorico[count].lucro,
            lucroProvisorio : this.listaValorPatrimonialHistorico[count].lucroProvisorio,
          })

        count++
      })  
      //historico.shift()
      return historico

    
  }
  totalCompra()
  {
    return this.TodosAtivos().reduce( ( acumulador , ativo ) => {
      let resultado = ativo.totalCompra() 
      
      return acumulador +  resultado
    } , 0) 
  }
  OrdenarHistorico(){
    this.historico.sort( ( a , p ) => {
      return new Date(a.data ) - new Date(p.data)
    } )
  }
  OrdenarOperacao(){
    this.operacoes().sort( ( a , p ) => {
      return new Date(a.data ) - new Date(p.data)
    } )
  }
  ObterAtivosLista(){
    let rendaTotal = this.RendaTotal()
    let ativos = []

    rendaTotal.forEach( (ativo) => {
      ativos = [...ativos,ativo.nome]
    } )

    return ativos
  }
  ObterAtivoPeloNome( buscarNome )
  {
    let encontrado = false

    
    encontrado = this.RendaVariavel.find( ({nome}) => nome == buscarNome  ) 
   
   // console.log('RENDA VARIAVEL FIND:', encontrado)
    if( encontrado == undefined )
      encontrado = this.RendaFixa.find( ({nome}) => nome == buscarNome  ) 

    return encontrado 
  }
  /** fazer fetch e trazer os valores cotacao */
  buscarValorCotacao(){
    this.RendaVariavel.forEach( item => {
      let nomeAtivo = item.nome

      try{
        /** fetch item and get cotacao */
        ObterCotacao(nomeAtivo , (valor) => {
          item.cotacao = Number( valor )
        })
      }
      catch( e ){
        throw ("Erro não foi possivel consultar o nome pelo ativo, provavelmente o nome está errado, por favor consulte pela sigla do ativo com o numero exemplo itausa: ITSA3")
      }

     
    })
  }
  operacoes(){
    
    let ativos = this.TodosAtivos()
    let operacoes = []
    /*** misturar operacoes de diversos ativos */
    ativos.forEach( ( ativos ) => {
      let operacao = ativos.operacoes
      // operacao.ativo = this.ObterAtivoPeloNome(operacao.nomeAtivo)
      operacoes = [ ...operacoes , operacao ]
      
    } )

    return operacoes
  }
  historicoMensal(){
    let historico = this.historico()

    console.log(historico)
    let historicoMensal = []

    //let jumpZero = 0
    
    //historico.shift()
    historico.forEach( (historico) => {
      
      let data = "t" + ( historico.data.getMonth() + 1) + historico.data.getFullYear()
      
      if(data != null )
      {
          let lucroAcumulado = 0
          let vpa = 0
          let nome = ""

          
          if( historicoMensal[data] != null ){
           // qtd--

            lucroAcumulado =  historicoMensal[data].lucroProvisorio ;

          let gambi_no_bug = isNaN( lucroAcumulado ) ? 0 : lucroAcumulado ;

            vpa =  historicoMensal[data].vpa ;

          gambi_no_bug = isNaN( vpa ) ? 0 : vpa ;


            //if( historico.nome != historicoMensal[data].nome){
              nome += historico.nome + " "
              nome+= historicoMensal[data].nome
            //}
            // else{
            //  // console.log(historico.nome)
            //   nome = historico.nome
            // } 
            
          }else{
            
            nome = historico.nome
          }
          
          historicoMensal[data] = { 
            data: ( historico.data.getMonth() + 1) + "/" + historico.data.getFullYear(),
            nome , 
            lucroProvisorio : isNaN( historico.lucroProvisorio + lucroAcumulado ) ? 0 : historico.lucroProvisorio + lucroAcumulado,
            vpa : isNaN( historico.vpa + vpa ) ? 0 : historico.vpa + vpa
            
          }
          //console.log( historicoMensal[data].data )
      }
      
    })

    return historicoMensal
    //return historicoMensal.filter( item => item != null)
  }
  calcucarProporcoesRendaVariavel( ){
    
    // nome ativo , proporção ativo ex: papel[nome].proporcao ou papel.nome,papel.proporcao
    let proporcaoGeral = []

    let ativos = [...this.RendaVariavel , ...this.RendaFixa]
    ativos.forEach( ( ativo )=>{

     let proporcao = ativo.valorPatrimonial() / this.valorPatrimonialTotal() * 100
      proporcaoGeral.push(
        {
          nome:ativo.nome, 
          proporcao, 
          rentabilidadeProvisoria: ativo.lucroTotalRelativo(),
          rentabilidade: ativo.lucroRealizadoRelativo() ,
          
        })

    } )

    this.proporcoes = proporcaoGeral
    return proporcaoGeral

  }
  gerarDadosRendaVariavelPatrimonio( ){
    
    // nome ativo , proporção ativo ex: papel[nome].proporcao ou papel.nome,papel.proporcao
    let proporcaoGeral = []

    let ativos = [...this.RendaVariavel , ...this.RendaFixa]
    ativos.forEach( ( ativo )=>{

     let proporcao = ativo.valorPatrimonial() / this.valorPatrimonialTotal() * 100
      proporcaoGeral.push(
        {
          patrimonio: ativo.valorPatrimonial() 
        })

    } )

    this.proporcoes = proporcaoGeral
    return proporcaoGeral

  }
  adicionarDinheiro (quantia) {
    this.dinheiro += quantia
  }
  removerAtivoId(id ,  rendaFixa = true){
    if( rendaFixa )
      this.RendaFixa.filter( ( ativo )=> ativo.id != id  )
    else
      this.RendaVariavel.filter( ( ativo )=> ativo.id != id  )
  }

  removerAtivoNome( nome ,  rendaFixa = true){
    if( rendaFixa )
      this.RendaFixa.filter( ( ativo )=> ativo.nome != nome  )
    else
      this.RendaVariavel.filter( ( ativo )=> ativo.nome != nome  )
  }
  

}

export  {
  Carteira,
  TipoAtivo
}