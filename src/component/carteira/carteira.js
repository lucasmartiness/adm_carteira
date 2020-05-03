import React,{useState,useEffect} from 'react'
import { Field, reduxForm } from 'redux-form'
import {AppBar,Toolbar,makeStyles,Typography,Paper,List,Grid,Button,Input,TextField,IconButton} from '@material-ui/core'


import AtivoForm from './formulario'

import firebase from './../../firebase'

let db = firebase.firestore()

function loadAtivos( id , setAtivos = null ) {

  let data =[]
    db.collection('carteira/'+ id +"/ativo")
    .get()
    .then( ( docs ) => {
      
      docs.forEach( doc => {
        // { ativo: doc.data( ) } 
        let newData = doc.data()
        newData = {...newData,id:doc.id}
        data.push( newData )
      });

      return data
      
    })
    .then( (  data ) => {
      setAtivos( data )
    })
}
const Carteira = (props) => {
  
  
  let [carteira,setCarteira] =  useState({nome:"",id:0})
  let [ativos,setAtivos] =  useState( [] )

 
 
  useEffect( () => {

      db.collection('carteira').doc(props.match.params.id)
      .get()
      .then( ( doc ) => {
        setCarteira({nome:doc.data().title,id:doc.id}) 
      })

      loadAtivos( props.match.params.id, (data)=> setAtivos(data)  )

  },[props.match.params.id])

 
  const inserirAtivo = (fields) => {
     
  
      let novoAtivo = {
        nome: fields.nome || "",
        preco: fields.custo || "",
        qtd: fields.qtd || "",
        tipo: fields.TipoAtivo || "",
        acao: fields.tipo  || "",
        atrelacao: fields.atrelacao || "C",
        dataCompra: fields.dataInicio || "",
        dataFim: fields.dataFim || ""
      }
     
      console.log(novoAtivo)


    let id = props.match.params.id
   
    if( novoAtivo.nome != ""){
      db.collection("carteira/"+ id+"/ativo").doc().set( novoAtivo );
      loadAtivos( props.match.params.id, (data)=> setAtivos(data)  )

    }
    else{
      alert("é necessario preencher os campos")
    }
  }

  const deletarAtivo = ( id ) => {

    db.collection('carteira/'+props.match.params.id+"/ativo")
      .doc(id)
      .delete()
      .then( () => {

        alert("deleted")
        loadAtivos(  props.match.params.id, setAtivos )
      })
  }

  return(
    <>
      <Grid container>

        <Grid>
          <AtivoForm onSubmit={inserirAtivo}/>
        </Grid>
      </Grid>
      <Typography variant="h3" color="primary"> Carteira { carteira.nome } </Typography>
      <Ativos handleDelete={deletarAtivo} ativos={ativos} />
    </>
  )

}


function Ativos ( {ativos,handleDelete}) {
  return(
    <Grid container>
      { ativos && ativos.map( ativo => <Grid item sm={4} xs={12} > 
        <Paper style={{margin:"10px",padding:"10px"}}>

        <Typography variant="h6" color="primary"> Operação  {ativo.nome} </Typography>

          <Grid container>
            <Grid item style={{margin:"10px 15px 10px 0"}}>
            
              <Typography variant="body2" color="secondary"> Id  {ativo.id} </Typography>
              <Typography>  Acao  {ativo.acao} </Typography> 
              <Typography display="inline">  Preço 
                  <Typography display="inline" color="primary"> R$ {ativo.preco}  </Typography>  
              </Typography> 
              <Typography  color="primary"> atrelacao {ativo.atrelacao}  </Typography>  
              
            </Grid>
            <Grid item>
            <Typography>  qtd   {ativo.qtd} </Typography> 
                <Typography>  Tipo {ativo.tipo === 'true' ? "renda variavel" : "renda fixa"} </Typography> 
                { ativo.tipo == 'false' && ( <>
                  <Typography display="inline" color="primary"> prazo {ativo.dataFim} / </Typography>  
                
                </>)}
                <Typography display="inline" color="primary"> data compra {ativo.dataCompra}  </Typography>    

            </Grid>
          </Grid>
          <Button color="secondary" onClick={() => handleDelete( ativo.id ) }> deletar </Button>
        </Paper>
      </Grid>)}
    </Grid>
  )
}

export default Carteira