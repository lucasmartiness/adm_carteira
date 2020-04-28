import {Carteira,TipoAtivo} from './../src/Carteira'
import {Operacao,TipoOperacao} from './../src/Operacao'


const carteiraX = new Carteira(1,'carteira campeã x')
const carteiraT = new Carteira(2,'carteira t virus ')


carteiraT.adicionarAtivo( 
  new Operacao( "TesouroSelic" , 100,new Date(2020,9,14 ), TipoOperacao.Comprar  , 4 , new Date(2022,11,14 ) , 5)
  ,  TipoAtivo.RENDA_FIXA , 100)


carteiraX.adicionarAtivo( 
  new Operacao( "TesouroSelic" , 100,new Date(2020,9,14 ), TipoOperacao.Comprar  , 4 , new Date(2022,11,14 ) , 5)
  ,  TipoAtivo.RENDA_FIXA , 100)

  carteiraX.adicionarAtivo( 
    new Operacao( "TesouroSelic" , 200,new Date(2020,9,14 ), TipoOperacao.Comprar  , 4 , new Date(2022,11,14 ) , 5)
    ,  TipoAtivo.RENDA_FIXA , 100)
  
  carteiraX.adicionarAtivo( 
    new Operacao( "TesouroIPCA+" , 100,new Date(2020,9,14 ), TipoOperacao.Comprar  , 4 , new Date(2022,11,14 ) , 5)
    ,  TipoAtivo.RENDA_FIXA , 100)
  

export default {
  carteira:[
    carteiraX,
    carteiraT
  ]
}