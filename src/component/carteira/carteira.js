import React,{useState,useEffect} from 'react'



import {Link} from 'react-router-dom'
import data from './../../data/data.js'
 
import { TipoAtivo} from     './../../src/Carteira'
import {Operacao,TipoOperacao} from './../../src/Operacao'


const Ativos = ( {ativos} ) => {

  return(
    <>
      <p>Lista ativos</p>
      {
        ativos && ativos.map( (ativo,id) => (
          <div key={ativo.id }>
            ativo: { ativo.nome }  |
            patrimonio: { ativo.valorPatrimonial() }  |
            qtd: { ativo.qtd() } |
             
          </div>
        ))
      }

      {
        !ativos && (<> sem ativos </>)
      }
    </>
  )
}

const useForceUpdate = () => useState()[1];


const Carteira = (props) => {
  
  let [carteira,setCarteira] = useState(   data.carteira[props.match.params.id]  )
  let [rendaTotal,setRendaTotal] = useState( carteira.RendaTotal() )

  useEffect( () => {

    setCarteira( data.carteira[props.match.params.id ])

  },[props.match.params.id])


  const handleAdicionarCarteira = () => {

    let carteiraAntiga = data.carteira[props.match.params.id]

    carteiraAntiga.adicionarAtivo( 
      new Operacao( "Tbounds" , 100,new Date(2020,9,14 ), TipoOperacao.Comprar  , 4 , new Date(2022,11,14 ) , 1)
      ,  TipoAtivo.RENDA_FIXA , 100)

     setRendaTotal( carteiraAntiga.RendaTotal() )
 
    }

  return (<>
    {carteira && (
      <>
      carteira : {carteira.nome}
      <Ativos ativos={carteira.RendaTotal()} />


      <button onClick={()=> { handleAdicionarCarteira()}} > adicionar ativo </button>
      </>
    )}
    {!carteira && (
      <> 
        carteira não encontrada
      </>
    )}
  </>)
}
export default Carteira