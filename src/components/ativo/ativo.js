import React from 'react'
import firebase from './../../firebase'

import { useHistory } from "react-router-dom";


import {AppBar,Toolbar, Typography , Container, makeStyles , Card , CardActions, CardContent , Grid , Link , Button, Icon } from '@material-ui/core'
 
import {Link as Linker} from 'react-router-dom'
 
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

  return(
    <Grid xs={12} sm={3} md={2} className={classes.container} >

    <Button className={classes.button}  >
      <Card  className={classes.card}>
       
          <CardContent onClick={ handleClick }>
            <Typography variant="body2" >
              Ativo
            </Typography> 
            <Typography className={classes.text} variant="h2" color="primary" align="center">
              {props.title}
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