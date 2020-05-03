import React,{useState,useEffect} from 'react'


import data from './../../data/data.js'
 
const Ativos = ( {ativos} ) => {
  console.log(ativos)
  return(
    <>
      Lista de ativos <br/>
      {
        ativos && ativos.map( ativo => (
          <div key={ativo.nome }>
            ativo: {ativo.nome }
            valor patrimonial: {ativo.valorPatrimonial() }
            qtd: {ativo.qtd() } 

          </div>
        ))
      }
      {
        !ativos && (<> sem ativos </>)
      }
    </>
  )
}

const Carteira = (props) => {
 
  let [carteira,setCarteira] = useState( data.carteira[props.match.params.id] )

  useEffect( () => {
    console.log(data.carteira[props.match.params.id])
    console.log(props.match.params.id)

  },[props.match.params.id]) 


  return (<>
    <div> carteira : </div>


    <Ativos ativos={carteira.RendaTotal()} />
  </>)
}
export default Carteira