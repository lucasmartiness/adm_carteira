import React,{useState,useEffect} from 'react'

import data from './../../data/data.js'

const OperacoesList = ({operacoes}) => {
     
}

const Operacao = (props) => {

  let id = props.match.params.id
  let operacao = props.match.params.op   
  // console.log(id,operacao)
  //  console.log("DATA:",data.carteira[id].listaOperacoes[operacao])

  let [operacaoEscolhida,setOperacaoEscolhida] = useState( data.carteira[id].listaOperacoes[operacao] )

  useEffect( () => 
  {
    console.log("DATA:",data.carteira[id].listaOperacoes[operacao])
    setOperacaoEscolhida( data.carteira[id].listaOperacoes[operacao]  )

  }, [props.match.params.op ,  props.match.params.id ])
  return (<>
    Operacao X:  
      { operacaoEscolhida && (
        <> 
            { operacaoEscolhida.operacao.nomeAtivo }  |
            qtd { operacaoEscolhida.operacao.qtd }  |
            valor { operacaoEscolhida.operacao.valor }  |
            
        </>) 
      }

    {!operacaoEscolhida && (<> Operacao nao encontrado </>)}

  </>)
}

export default Operacao