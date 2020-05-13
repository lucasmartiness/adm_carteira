import React from 'react'
import firebase from './../../firebase'

import { useHistory } from "react-router-dom";
import {
  AppBar,  Toolbar,
  Typography ,
  Icon, IconButton,
  Container,  Grid , 
  makeStyles ,
  Card ,   CardContent ,  CardActions, 
  Link , 
  Button 
} from '@material-ui/core'
 
import {Link as Linker} from 'react-router-dom'
 
let styles = makeStyles((style)=>({
  container:{
    margin:"10px"
  },
  card:{
    width:"100%",
    minHeight:"100px"
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
  },
  blue:{
    color:'blue'
  },
  cardFooter:{
    position:"absolute",
    bottom: "0px"
  },
  cardFooterButtonContainer:{
    marginRight:"40px"
  }
}))

const Carteira = ( props ) => {

  let classes = styles()
  let history = useHistory();

    const handleClick = () => {
      history.push( "/carteira/"+props.id  )
    }  

  return(
    <Grid item xs={12} sm={5} md={5} lg={2} className={classes.container} >

    <Button className={classes.button} >
      <Card  className={classes.card} variant="outlined">
       
          <CardContent  onClick={ handleClick }>
            <Typography className={classes.text} variant="h2"  align="left">
              {/* <Icon>star </Icon> */}
              {props.title}
            </Typography>
            
          </CardContent>
          <CardActions className={classes.cardFooter}>
            
              <IconButton onClick={ props.delete } color="secondary"  >
                <Icon>
                  delete
                </Icon>
              </IconButton>
              <IconButton onClick={ props.update }  >
                <Icon>
                  edit
                </Icon>
              </IconButton>
            
          </CardActions>
      </Card>
    </Button>
    
  </Grid>)
}

export default Carteira