import React from 'react'
import firebase from './../../firebase'

import {AppBar,Toolbar, Typography , Container, makeStyles , Card , CardContent , Grid , Link , Button } 
from '@material-ui/core'
import Icon from '@material-ui/core/Icon';

import {Link as Linker} from 'react-router-dom'
 

let styles = makeStyles((style)=>({
  container:{
    marginTop:"18px"
  },
  card:{
    width:"100%",
    minHeight:"100px"

  },
  text:{
    fontSize: "25px"
  },
  button:{
    width:"100%",
  }
}))

const Adicionar = ( props ) => {

  let classes = styles()


  const handleClick = () => {
    props.open()
  }  


  return(
  <Grid xs={12} sm={5} md={5} lg={2} className={classes.container} >
    <Button className={classes.button}  onClick={ handleClick }>
      <Card  className={classes.card} variant="outlined">
       
          <CardContent >
            <Typography variant="body2" >
              {props.texto}
            </Typography> 
            <Typography className={classes.text} variant="h6" align="center">
                <Icon>add_circle</Icon>
            </Typography>

          </CardContent >
      </Card>
    </Button>
    
  </Grid>)
}

export default Adicionar