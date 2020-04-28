import React,{useState,useEffect} from 'react'
import data from './../../data/data.js'
import {Carteira as carteira} from './../../src/Carteira'
const Carteira = (props) => {

  let [cart,setCart] = useState() 
  let [qtdAtivosCarteira,setQtd] = useState( ) 
  useEffect( () => {
    console.log(data)
  }) 
  const handleAdicionarCarteira = () => {

    data.carteira.push( new carteira( Math.floor( Math.random() * 100 )  , "fodona carteira") ) 

    setCart( data.carteira )
    setQtd( data.carteira.length)

  }
  return (<>
    Carteiras: {data.carteira && data.carteira.map( carteira => (
      <div key={carteira.id}>
        Nome: {carteira.nome} |
        Patrimonio: {carteira.valorPatrimonial(   )}
      </div>
    ))}

    <button onClick={()=> handleAdicionarCarteira( ) } > adicionar carteira </button>

  </>)
}
export default Carteira