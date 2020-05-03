import React from 'react'
import firebase from './../../firebase'

import { useHistory } from "react-router-dom";


import {AppBar,Toolbar, Typography , Container, makeStyles , Card , CardContent , Grid , Link , Button, Icon } from '@material-ui/core'
 
import {Link as Linker} from 'react-router-dom'
 
let styles = makeStyles((style)=>({
  container:{
    margin:"10px"
  },
  card:{
    width:"100%"
  },
  text:{
    fontSize: "14px",
    fontWeight:"bold"
  },
  button:{
    width:"100%"
  },
  red:{
    color:'red'
  }
}))

const Carteira = ( props ) => {

  let classes = styles()
  let history = useHistory();

    const handleClick = () => {
      history.push( "/carteira/"+props.id  )
    }  

  return(
    <Grid xs={12} sm={3} md={2} className={classes.container} >

    <Button className={classes.button} >
      <Card  className={classes.card}>
       
          <CardContent  onClick={ handleClick }>
            <Typography variant="body2" >
              Carteira
            </Typography> 
            <Typography className={classes.text} variant="h2" color="primary" align="center">
              {props.title}
            </Typography>
            
          </CardContent>
          <Button onClick={ props.delete } className={classes.red} >
              Delete
            </Button>
      </Card>
    </Button>
    
  </Grid>)
}

export default Carteira