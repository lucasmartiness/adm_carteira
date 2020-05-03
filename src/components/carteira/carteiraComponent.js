import React, {useState,useEffect} from 'react'
import firebase from './../../firebase'

import {AppBar,Toolbar,Typography , Container, makeStyles , Box , Grid , Paper} from '@material-ui/core'

import Carteira from './carteira'
import AdicionarButton from './adicionarButton'
import Navbar from './navbar'

import FormCarteira from './form'

const carteiraRef = () => firebase.firestore().collection("carteira")

let styles = makeStyles((style)=>({
  carteiraContainer:{
    padding:"20px",
    marginTop: "40px"
  },
  container:{
    // background:" #eee"
    margin: "auto auto",
  },
  topContainer:{
    display:"flex",
    justifyContent:"center",
    width: "100%"
  }
}))


export const Carteiras = ( props ) => {

  let classes = styles()
  let [carteiras,setCarteiras] = useState([]) 

  let [formOpen, setFormOpen] = useState(false)



  const handleDelete = (id) => carteiraRef().doc(id).delete()
  const handleInsert = (title) => carteiraRef().add({title}).then( () => setFormOpen( false ))

  useEffect( () => {

    let uns = carteiraRef()
      .onSnapshot(( carteiras ) => {

        const carteirasCarregadas = carteiras.docs.map( carteira => ( {id:carteira.id, ...carteira.data() } ) )
        
        setCarteiras (carteirasCarregadas)

        console.log(carteirasCarregadas)
      })

      return () => uns()
  },[  ])

  return(<>
    <FormCarteira onClose={() => setFormOpen( !formOpen) } open={formOpen} 
                  onSave={ (nome) => handleInsert(nome) } />
    <Navbar />
    <Box bgColor="green" className={classes.topContainer}>
      <Container className={classes.container}>

          
          <Paper className={ classes.carteiraContainer} elevation={3}>

            <Typography variant="h4" component="h1">
              Suas Carteiras
            </Typography>

            <Grid container  spacing={2}>
            
              {carteiras && carteiras.map(
                  carteira => 
                  ( <Carteira key={carteira.id} 
                              title={ carteira.title} 
                              id={carteira.id}
                              delete={ () => handleDelete( carteira.id )}  />)    )}
              
              <AdicionarButton 
                  texto="Adicionar" 
                  open={ () => setFormOpen(true)}        />
            </Grid> 
          </Paper>
      </Container>
    </Box>
  </>)
}