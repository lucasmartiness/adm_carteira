import React from 'react';
import {AppBar,Toolbar,makeStyles,Typography} from '@material-ui/core'

import {Link} from 'react-router-dom'

let useStyle = makeStyles( theme => ({

    appbar:{
      display:"block",
      position:"relative"
    }

} ) ) 

function Navbar () {

  let styles = useStyle()

  return( <AppBar className={styles.appbar}>
    <Toolbar>
        <Typography > App Financeiro </Typography>
    </Toolbar>  
  </AppBar> )
}

export default  Navbar