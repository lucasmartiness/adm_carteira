import React,{useState,useEffect} from 'react'
import Navbar from './navbar'
 
import firebase from './../../firebase'


import {AppBar,Toolbar,Typography , Container, makeStyles , Breadcrumbs, Link , Box , Grid , Paper} from '@material-ui/core'
import AdicionarButton from '../carteira/adicionarButton'

import {Link as RouterLink} from 'react-router-dom'


import Ativo from './ativo'

import AtivoForm from './form'


const carteiraRef = () => firebase.firestore().collection("carteira")

const ativoRef = (id) => firebase.firestore().collection("carteira/"+id+"/ativo")




let styles = makeStyles((style)=>({
  carteiraContainer:{
    padding:"20px",
    marginTop: "40px"
  },
  container:{
    // background:" #eee"
  }
}))


const AtivoComponent = ( props ) => {
  
  let classes = styles()
  let [ativos, setAtivos] = useState()

  let [formOpen, setFormOpen] = useState(false)



  

  useEffect( () => {

     
    let unsubscribe = 
      ativoRef( props.match.params.carteira )
        .onSnapshot( (ativos) => {
          console.log(ativos)
          setAtivos( ativos.docs.map( ativo => ({ id:ativo.id, ...ativo.data() }) ) )
        })
        



      return () => { unsubscribe() ; }
  },[])


  const handleInsert = (data) => ativoRef(props.match.params.carteira).doc(data.nome).set( data )
  .then( () => alert("ativo adicionado") )


  const handleDelete = ( data ) =>  ativoRef(props.match.params.carteira).doc(data).delete().then( () => alert("ativo deletado"))
  return(<>
    <AtivoForm  
      onClose={()=>setFormOpen(false) } 
      open={formOpen}
      onSave={handleInsert}/>


    <Navbar />
    <Container className={classes.container}>

    <Breadcrumbs>
          
          <Link 
                component={RouterLink}
                to='/carteira'> Carteira 
          </Link>
        </Breadcrumbs>

        <Paper className={ classes.carteiraContainer}>

          <Typography variant="h4" component="h1">
            Seus Ativos
          </Typography>

          <Grid container  spacing={2}>
          
             {ativos && ativos.map(
                ativo => 
                ( <Ativo base={"/carteira/"+ props.match.params.carteira +"/ativo/" + ativo.id}
                         key={ativo.id} 
                         title={ ativo.nome}
                         id={ativo.id}  
                         onDelete={ () => handleDelete( ativo.id )}
                  />)    
              )}
            

            <AdicionarButton texto="adicionar" open={()=>setFormOpen(true)}    />
          </Grid> 
        </Paper>
    </Container>
  </>)
}
export default AtivoComponent