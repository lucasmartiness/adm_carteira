import React from 'react'

import {AppBar,Toolbar,Typography , makeStyles} from '@material-ui/core'

let styles = makeStyles((style)=>({
  appbar:{
    position:"relative"
  }
}))

const NavbarCustom = ( props ) => {

  let classes = styles()

  return(
  <AppBar className={classes.appbar}>
    <Toolbar>
      <Typography>
        Carteira
      </Typography>
    </Toolbar>
  </AppBar>)
}

export default NavbarCustom