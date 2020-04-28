const axios = require('axios')


const ObterCDI = async ( cdi_metodo ) => {
  
  await axios('https://api.hgbrasil.com/finance/taxes?key=27dee671')
    .then(data => cdi_metodo( {cdi:data.data.results[0].cdi,data:data.data.results[0].date} ) ) 

}

const ObterSELIC = async ( selic_metodo ) => {
  
  await axios('https://api.hgbrasil.com/finance/taxes?key=27dee671')
    .then(data => selic_metodo( {selic:data.data.results[0].selic,data:data.data.results[0].date} ) ) 
    
}

const ObterIBOVvar = async ( ibov_variacao , qtdMeses = 0 ) => {
  let key = '5T9PSLWSUIE8115V'
 
  await axios('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=BOVA11.SAO&apikey='+key)
    .then(res => {
      let resultado = {}

      resultado = Object.entries( res.data['Monthly Time Series'] )
      resultado = resultado.map( item => {
        return item[1]

      })

     // console.log( resultado[0]['4. close'] , resultado[qtdMeses]['4. close']  )

      let variacao = resultado[0]['4. close'] / resultado[qtdMeses]['4. close']
      
      if( Number(resultado[0]['4. close'] ) <  Number( resultado[qtdMeses]['4. close'] ) ){
        variacao = ( 1 - variacao  ) * -1
      }

      ibov_variacao(  variacao  ) 
    }) 

    .catch( e => console.log("ERRO: ",e))
}


const ObterIBOV = async ( ibov_metodo ) => {
  
  await axios('https://api.hgbrasil.com/finance/quotations?key=27dee671')
    .then(data => ibov_metodo( data.data.results.stocks.IBOVESPA.points ) ) 
    
}
const ObterCotacao = async ( nome, acao_metodo ) => {
  let key = '5T9PSLWSUIE8115V'
  console.log(nome)
  await axios('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+nome+'.SA&apikey='+key)
    .then(res => {
      let resultado = {}

      resultado = Object.entries( res.data['Time Series (Daily)'] )
      resultado = resultado.map( item => {
        return item[1]
      })
      //console.log( res.data)
      resultado = resultado[0]['4. close']
      

      acao_metodo(resultado)
    }) 
    
}

const ObterListaBusca = async ( busca , acao_metodo) => 
{
  await axios( 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+ busca +'&apikey=5T9PSLWSUIE8115V')
  .then(res => {
    let lista = res.data.bestMatches

    acao_metodo(lista)
  }) 
}
const ObterIPCA = async ( ipca_metodo ) => {
  
  await axios('https://api.bcb.gov.br/dados/serie/bcdata.sgs.16121/dados/ultimos/12?formato=json')
    .then( res => {
       let total = 0
       total = res.data.reduce( (acc , atual) => { 
       
       return acc + Number( atual.valor )  
      } , 0 )

      ipca_metodo( total ) 
      
    }) 
    
}
module.exports = {
  ObterCDI,
  ObterSELIC,
  ObterIBOV,
  ObterIPCA,
  ObterCotacao,
  ObterListaBusca,
  ObterIBOVvar
}