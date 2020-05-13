import React from 'react'
import firebase from './../../firebase'

import { useHistory } from "react-router-dom";


import {AppBar,Toolbar, Box, Typography , Container, makeStyles , Card , CardActions, CardContent , Grid , Link , Button, Icon } from '@material-ui/core'
 
import {Link as Linker} from 'react-router-dom'
 
const mapTipoAtivo = []
mapTipoAtivo['acao'] = 'Ação'
mapTipoAtivo['titulo'] = 'Titulo'
mapTipoAtivo['fundo_de_emergencia'] = 'Fundo de Emergencia'
mapTipoAtivo['fundo_imobiliario'] = 'Fundo Imobiliario'

let styles = makeStyles((style)=>({
  container:{
    margin:"10px"
  },
  card:{
    width:"100%",
     
  },
  text:{
    fontSize: "14px",
    fontWeight:"bold",
    textTransform:"capitalize"
  },
  button:{
    width:"100%"
  },
  cardAction:{
    display:"flex",
    justifyContent:"center"
  }
}))

const Ativo = ( props ) => {

  
  let classes = styles()
  let history = useHistory();

  const handleClick = () => {
    history.push( props.base   )
  }  

  console.log( mapTipoAtivo[props.rotulo] , props.rotulo )
  return(
    <Grid xs={12} sm={5} md={5} lg={2} className={classes.container} >

    <Button className={classes.button}  >
      <Card  className={classes.card} variant="outlined">
       
          <CardContent onClick={ handleClick }>
            <Typography variant="subtitle2" align="left">
              { mapTipoAtivo[ props.rotulo ] || "Ativo"}
            </Typography> 
            <Typography className={classes.text} variant="body1" color="primary" align="left">
              {props.title}
            </Typography>
            <Typography  className={classes.text} variant="h2" color="secondary" align="left">
              {/* Patr    { Number.Format( Number.parseFloat( props.patrimonio ) )} */}
              Patrimonio { new Intl.NumberFormat('pt-BR' , { style: 'currency', currency: 'BRL' }).format( props.patrimonio.toFixed(2) ) }
            </Typography>
          </CardContent>
          <CardActions className={classes.cardAction}>

            <Button 
                variant="contained"
                color="secondary"
                onClick={props.onDelete}>
              Deletar
            </Button>

          </CardActions>
      </Card>
    </Button>
    
  </Grid>)
}

export default Ativo