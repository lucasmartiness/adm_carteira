import React,{useState,useEffect} from 'react'
import { Field, reduxForm } from 'redux-form'

import Formulario from './formulario.js'


import {Link} from 'react-router-dom'
import data from './../../data/data.js'
 
import { TipoAtivo} from     './../../src/Carteira'
import {Operacao,TipoOperacao} from './../../src/Operacao'

 
const Ativos = ( {ativos , onDelete, onSelect} ) => {

  return(
    <>
      <p>Lista de ativos</p>
      {
        ativos && ativos.map( (ativo,id) => (
          <div key={ativo.id }>
            ativo: { ativo.nome }  |
            patrimonio: { ativo.valorPatrimonial() }  |
            qtd: { ativo.qtd() } |
            lucro realizado: {ativo.lucroRealizado() } |
            lucro %: {ativo.lucroTotalRelativo()} |
            tipo de ativo : {ativo.tipo} |
            <button onClick={()=>onDelete(ativo.nome)} > Deletar </button>
            <button onClick={()=>onSelect(ativo.nome, ativo.qtd(), ativo.tipo)} > Select </button>
            {/* tipo de ativo : {ativo.tipo} | */}
       
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


  const handleAdicionarCarteira = (valores) => {


    let carteiraAntiga = data.carteira[props.match.params.id]
    //alert(valores.TipoAtivo)
    
    let tipoAtivo = valores.TipoAtivo == 'true' ? true : false


    console.log( tipoAtivo )
    carteiraAntiga.adicionarAtivo( 
      new Operacao( valores.nome , parseFloat( valores.custo ) , valores.dataInicio, valores.tipo  , parseInt( valores.qtd ), valores.dataFim , parseFloat( valores.juros ) )
      , tipoAtivo  , valores.custo)

     setRendaTotal( carteiraAntiga.RendaTotal() )
 
    }

  return (<>
    {carteira && (
      <>
      <div> 
        <h2> carteira : {carteira.nome} </h2>
      </div>


      <Formulario onSubmit={handleAdicionarCarteira} />


      <Link to={"/carteiras/"}> Voltar </Link>
      <Ativos onDelete={(id)=>alert(id)}
              ativos={carteira.RendaTotal()}
              onSelect={(nome,qtd,tipo) => console.log( nome,qtd,tipo )} />
      

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