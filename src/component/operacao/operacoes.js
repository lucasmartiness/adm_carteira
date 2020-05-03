import React,{useState,useEffect} from 'react'

import data from './../../data/data.js'
import {Link} from 'react-router-dom'


const OperacoesList = ({operacoes}) => {

  if(!operacoes){
    return (<div>Carteira não encotrada</div>)
  }
  return  operacoes.map( (operacao , key) => (
  <div key={ key } > 
      {
        operacao.map( op => {
          return(<div key={op.id}> 
            Operacao: {op.nomeAtivo} | qtd: {op.qtd} |  valor: {op.valor}
          </div>)
        } )
      }
  </div>) )
  
}

const Operacoes = (props) => {

  let [operacoes,setOperacoes] = useState( data.carteira[0].operacoes() )
   
  useEffect( ( ) => {
    if(data.carteira[props.match.params.id]){
      setOperacoes( data.carteira[props.match.params.id].operacoes())
    }
    else{
      setOperacoes(null)
    }
     
  } , [props.match.params.id])

  console.log ( "Operacoes: ",operacoes )
  return (<>
    <div> Operacao  </div>
    <Link to={"/carteiras/"}> Voltar </Link>
    <OperacoesList operacoes={operacoes}/>
  </>)
}

export default Operacoes