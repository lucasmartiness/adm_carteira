const {Carteira, TipoAtivo} = require("./Carteira")
const { ObterCDI , ObterSELIC, ObterIBOV, ObterIPCA,ObterCotacao ,ObterListaBusca,ObterIBOVvar } = require("./Mercado")
const { Operacao,TipoOperacao } = require("./Operacao")


let compraSMILE= new Operacao( "SMLS3" , 10.45,new Date(2020,11,10 ), TipoOperacao.Comprar , 6 )
let venderSMILE= new Operacao( "SMLS3" , 10.45,new Date(2020,11,16 ), TipoOperacao.Comprar , 2 )


let compraITAU2= new Operacao( "ITSA3" , 9.85,new Date(2020,9,14 ), TipoOperacao.Comprar  ,7)
let compraITAU= new Operacao( "ITSA3" , 9.64, new Date(2019,10,22 ) , TipoOperacao.Comprar ,1 )
let compraITAU3= new Operacao( "ITSA3" , 9.70,new Date(2020,10,12 ), TipoOperacao.Comprar  ,2)
let compraITAU4= new Operacao( "ITSA3" , 9.63,new Date(2020,10,13 ), TipoOperacao.Comprar  ,1)
let compraITAU5= new Operacao( "ITSA3" , 10.44,new Date(2020,10,14 ), TipoOperacao.Vender  ,5)
let compraITAU6= new Operacao( "ITSA3" , 10.86,new Date(2020,10,16 ), TipoOperacao.Vender  ,1)


let carteira = new Carteira( 0 , "carteira diversificada")

carteira.adicionarAtivo( compraITAU, TipoAtivo.RENDA_VARIAVEL , 10.66 )
carteira.adicionarAtivo( compraITAU2, TipoAtivo.RENDA_VARIAVEL , 10.66 )
// carteira.adicionarAtivo( compraITAU2, TipoAtivo.RENDA_VARIAVEL, 10.66 )
// carteira.adicionarAtivo( compraITAU3, TipoAtivo.RENDA_VARIAVEL , 10.66 )
// carteira.adicionarAtivo( compraITAU4, TipoAtivo.RENDA_VARIAVEL , 10.66 )
// carteira.adicionarAtivo( compraITAU5, TipoAtivo.RENDA_VARIAVEL , 10.66 )
// carteira.adicionarAtivo( compraITAU6, TipoAtivo.RENDA_VARIAVEL , 10.66 )

// carteira.adicionarAtivo( compraSMILE,  TipoAtivo.RENDA_VARIAVEL ,10.33)
// carteira.adicionarAtivo( venderSMILE,  TipoAtivo.RENDA_VARIAVEL ,10.43)

carteira.adicionarAtivo( 
  new Operacao( "TesouroSelic" , 100,new Date(2020,9,14 ), TipoOperacao.Comprar  , 4 , new Date(2022,11,14 ) , 5)
  ,  TipoAtivo.RENDA_FIXA , 100)
  carteira.adicionarAtivo( 
    new Operacao( "TesouroSelic" , 100,new Date(2020,9,16 ), TipoOperacao.Comprar  ,2 , new Date(2024,10,14 ) , 5)
    ,  TipoAtivo.RENDA_FIXA , 100)


  carteira.adicionarAtivo( 
      new Operacao( "TesouroSelic" , 100,new Date(2020,9,16 ), TipoOperacao.Comprar  ,2 , new Date(2024,10,14 ) , 5)
      ,  TipoAtivo.RENDA_FIXA , 100)
  
  carteira.adicionarAtivo( 
      new Operacao( "TesouroSelic" , 100,new Date(2020,11,16 ), TipoOperacao.Comprar  ,2 ,new Date(2026,10,14 ) , 5)
      ,  TipoAtivo.RENDA_FIXA , 100)
  
      carteira.adicionarAtivo( 
        new Operacao( "TesouroSelic" , 100,new Date(2020,6,16 ), TipoOperacao.Comprar  ,2 ,new Date(2026,10,14 ) , 5)
        ,  TipoAtivo.RENDA_FIXA , 100)

    carteira.adicionarAtivo( 
      new Operacao( "TesouroSelic" , 105,new Date(2020,10,18 ), TipoOperacao.Vender  ,4 , null , null)
      ,  TipoAtivo.RENDA_FIXA , null , "SELIC")
  
  carteira.adicionarAtivo( Operacao.Resgate( "TesouroSelic", 2 , 5 , new Date(2020,11,18)   )    
    ,  TipoAtivo.RENDA_FIXA ,null , "SELIC")
 
    carteira.adicionarAtivo( Operacao.Resgate( "TesouroSelic", 2 , 5 , new Date(2020,11,18)  )    
    ,  TipoAtivo.RENDA_FIXA ,null , "SELIC")

//new Operacao( "TesouroSelic" , null ,new Date(2020,10, 14 ), TipoOperacao.Resgate  ,null , '14-10-2022' , 2)

    
    console.log(  "Valor patrimonial da carteira",carteira.valorPatrimonial(   ) )
    console.log(  "Valor patrimonial da carteira valorizado:",carteira.valorPatrimonialCotacao(   ) )
    
    
    
    console.log(  "Lucro Realizado carteira:",carteira.lucroCarteiraRealizado(   ) )
    console.log(  "Lucro Realizado carteira %:",carteira.lucroCarteiraRealizadoRelativo(   ) )
    
    console.log(  "Lucro provisorio carteira:",carteira.lucroProvisorioTotal(   ) )
  console.log(  "Lucro provisorio carteira %:",carteira.lucroProvisorioTotalRelativo(   ) )
  console.log(  "Caixa",carteira.dinheiro )
  
  console.log( carteira.RendaTotal() )
  
  // console.log(  "media juros ",carteira.RendaTotal()[0].calcularMediaJuros() )
  // console.log(  "valor medio compra com juros ",carteira.RendaTotal()[0].valorMedioCompraComJuros () )

  // console.log(  "media de juros ",carteira.RendaTotal()[0].calcularMediaJuros() )
  // console.log(  "total Venda total",carteira.RendaTotal()[0].totalRealizados() )
  console.log(  "historico",carteira.historicoMensal() )


// console.log(  carteira.RendaTotal() )
// console.log(  "DIFERENÇA ENTRE COMPRA E VENDA DE VALORES",carteira.RendaVariavel[0].calcularDiferencaTotalCompraVenda() )
// console.log(  "NOME: ",carteira.RendaVariavel[0].nome )
// console.log(  "Quantidade de ativos",carteira.RendaVariavel[0].qtdAtivosEmPosse() )
// console.log(  "Valor Patrimonial",carteira.RendaVariavel[0].valorPatrimonial() )
// console.log(  "Valor Patrimonial cotacao",carteira.RendaVariavel[0].valorPatrimonialCotacao() )  
// console.log(  "Quantidade de comprar",carteira.RendaVariavel[0].qtdAtivosComprados() )
// console.log(  "Quantidade de vendas",carteira.RendaVariavel[0].qtdAtivosVendidos() )


// console.log(  "Total vendas",carteira.RendaVariavel[0].totalVenda() )
// console.log(  "Total compras",carteira.RendaVariavel[0].totalCompra() )


// // console.log(  "Lucro valor",carteira.RendaVariavel[0].calcularLucroOperacoes() )
// console.log(  "Lucro Não Realizado %",carteira.RendaVariavel[0].lucroRelativoNaoRealizado(10.66) )
// console.log(  "Lucro Não Realizado",carteira.RendaVariavel[0].lucroNaoRealizado(10.66) )
// console.log(  "Lucro Realizado",carteira.RendaVariavel[0].lucroRealizado(  ) )
// console.log(  "Lucro Realizado %" ,carteira.RendaVariavel[0].lucroRealizadoRelativ


// console.log(  "Total vendas",carteira.RendaVariavel[0].totalVenda() )
// console.log(  "Total compras",carteira.RendaVariavel[0].totalCompra() )


// // console.log(  "Lucro valor",carteira.RendaVariavel[0].calcularLucroOperacoes() )
// console.log(  "Lucro Não Realizado %",carteira.RendaVariavel[0].lucroRelativoNaoRealizado(10.66) )
// console.log(  "Lucro Não Realizado",carteira.RendaVariavel[0].lucroNaoRealizado(10.66) )
// console.log(  "Lucro Realizado",carteira.RendaVariavel[0].lucroRealizado(  ) )
// console.log(  "Lucro Realizado %" ,carteira.RendaVariavel[0].lucroRealizadoRelativo(  ) )

// // console.log(  "Lucro Cotação",carteira.RendaVariavel[0].calcularLucroCotacao( 10.66 ) )



// console.log(  "media compra",carteira.RendaVariavel[0].calcularMediaCompra() )
// console.log(  "media venda",carteira.RendaVariavel[0].calcularMediaVenda(
  
// // console.log(  "Lucro Cotação",carteira.RendaVariavel[0].calcularLucroCotacao( 10.66 ) )



// console.log(  "media compra",carteira.RendaVariavel[0].calcularMediaCompra() )
// console.log(  "media venda",carteira.RendaVariavel[0].calcularMediaVenda() )


// console.log(  "Custo do ativo",carteira.RendaVariavel[0].calcularCustoDeCompra(   ) )






//carteira.buscarValorCotacao();
// let op = carteira.listaValorPatrimonialHistorico


// op = op.sort( ( a , p ) => {
// //  console.log( a.operacao.data,p.operacao.data)
//   return new Date(a.operacao.data )  - new Date(p.operacao.data)  
// } ) 


//console.log(  "HISTORICO", carteira.historico() )
// console.log(  "HISTORICO 2", )

//console.log(  "Lista de ativos",carteira.ObterAtivosLista(   ) )

// console.log(  carteira.calcucarProporcoesRendaVariavel())
// console.log(  carteira.operacoes() )


// let CDI =  0
// ObterCDI( cdi => {
//    CDI = cdi 
//    console.log("CDI",  CDI )
// })

// ObterSELIC( selic => {
  
//   console.log("SELIC",  selic )
// })

// ObterIBOV( ibov => {
  
//   console.log("IBOV",  ibov )
// })

// ObterIPCA( ipca => {
  
//   console.log("IPCA 12 meses",  ipca )
// })
// ObterListaBusca('ITAU',listaBusca => {
  
//   console.log( listaBusca )
// })

//ObterIBOVvar( ( vari ) => {console.log( vari)} , 4 )
//ObterCotacao("TRPL4",(res) => {console.log(res)} ) 






