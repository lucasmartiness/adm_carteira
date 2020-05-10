import React, {useState,useEffect} from 'react'
import firebase from './../../firebase'

import {AppBar,Toolbar,Typography , Container, makeStyles , Card , Box , Grid , Paper} from '@material-ui/core'

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
  

  useEffect( () => {
    
    let uns = carteiraRef()
    .onSnapshot(( carteiras ) => {
      
      const carteirasCarregadas = carteiras.docs.map( carteira => ( {id:carteira.id, ...carteira.data() } ) )
      
      setCarteiras (carteirasCarregadas)
      
      console.log(carteirasCarregadas)
    })
    
    return () => uns()
  },[ props.match.url ])



  let [carteiras,setCarteiras] = useState([]) 
  let [formOpen, setFormOpen] = useState(false)
  let [updateData , setUpdateData ] = useState({id:0, update:false , fields:{ nome : "" }})
  
  const handleDelete = (id) => carteiraRef().doc(id).delete()

  const handleInsert = (title) => {

    if(!updateData.update){

      carteiraRef().add({title}).then( () => setFormOpen( false ))
    }
    else{
      carteiraRef().doc( updateData.id ).set({title}).then( () => setFormOpen( false ))
      setUpdateData({ id:0 , update:false, fields:{ nome:""} })
    }
    
  }
  
  const handleUpdate = ( id ) => {
    
    
    carteiraRef().doc( id ).get().then( ( data ) => {
      
      console.log( data.data().title )
      setUpdateData({id, update:true, fields:{ nome : data.data().title} } )
      setFormOpen(true)
      
     } )
    
    //
  }

  return(<>
    <FormCarteira 
        onClose={() => setFormOpen( !formOpen) }
        open={formOpen} 
        onSave={ (nome) => handleInsert(nome) } 
        nome = { updateData.fields.nome }
        />
    <Navbar />
    <Box bgColor="green" className={classes.topContainer}>
      <Container className={classes.container}>

          
          <Card className={ classes.carteiraContainer} variant="outlined">
            <Typography>
              Suas  
            </Typography>
            <Typography variant="h4" component="h1">
              Carteiras
            </Typography>

            <Grid container  spacing={2}>
            
              {carteiras && carteiras.map(
                  carteira => 
                  ( <Carteira key={carteira.id} 
                              title={ carteira.title} 
                              id={carteira.id}
                              delete={ () => handleDelete( carteira.id )} 
                              update={ () => handleUpdate( carteira.id )} />)    )}
              
              <AdicionarButton 
                  texto="Adicionar" 
                  open={ () => setFormOpen(true)}        />
            </Grid> 
          </Card>
      </Container>
    </Box>
  </>)
}