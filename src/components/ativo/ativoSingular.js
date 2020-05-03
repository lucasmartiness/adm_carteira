import React,{useState,useEffect} from 'react'
import Navbar from './navbar'
import {AppBar,Toolbar,Typography , Container, makeStyles , Link , Box , Button, Grid , Breadcrumbs , Paper,Card,CardContent} from '@material-ui/core'
import FormOperacao from './formOperacao'
import firebase from './../../firebase'

import {Link as RouterLink} from 'react-router-dom'

const operacoesRef = (carteira_id,ativo_id) => 
  firebase.firestore().collection("carteira/"+carteira_id+"/ativo/"+ativo_id+"/operacao")

const carteiraRef = () => firebase.firestore().collection("carteira")


const ativoRef = (carteira , ativo) => firebase.firestore().collection("carteira/"+carteira+"/ativo/"+ ativo)

const ativo_link = ( carteira_param ) => "/carteira/"+carteira_param+"/ativo"


let styles = makeStyles((style)=>({
  carteiraContainer:{
    padding:"20px",
    marginTop: "40px"
  },
  container:{
    // background:" #eee"
  },
  operacoesContainer:{
    marginTop:"60px",
    padding: "20px"
  }
}))



const AtivoSingular = (props ) => {


  let carteira_param = props.match.params.carteira
  let ativo_param = props.match.params.ativo 

  let classes = styles()

  let [ativo, setAtivo] = useState([])
  let [operacoes, setOperacoes] = useState([])

  useEffect( () => {

    let unsubscribe = firebase
      .firestore()
      .collection("carteira/"+carteira_param+"/ativo/")
      .doc(ativo_param)
      .get()
      .then( ativo => {
        if(!ativo.exists){
          alert("not exists")
        }
        setAtivo( ativo.data() )
      })

        return () =>  unsubscribe  
        
  } , [] )

  useEffect ( () => {
    let unsubscribe =  
      operacoesRef( carteira_param , ativo_param )
        .onSnapshot( operacoes => {
          let operacoesTotal = operacoes.docs.map( operacao => ({id:operacao.id , ...operacao.data()} ))
          setOperacoes(operacoesTotal)
          
          console.log(operacoesTotal)
        })
    return () => unsubscribe
  } , [])



  const handleSave = ( operacao ) => {

    operacoesRef( carteira_param , ativo_param ).add( operacao ) 
      .then( () => {
        console.log( operacao )
      })
  }
  const handleDelete = ( id ) => {
    operacoesRef( carteira_param , ativo_param )
      .doc(id)
      .delete()
      .then( () => alert( "Operação deletada!"))
  }

  let [openDialog, setOpenDialog] = useState(false)

  return(<>
    <Navbar />

    <FormOperacao 
        open={openDialog} 
        onClose={()=>setOpenDialog(false)}
        nome={ ativo.nome }
        onSave={handleSave}
        EhAtivoVariavel={ ativo.ehAtivoVariavel}  />
      
    <Container  className={classes.container} >
        
        <Breadcrumbs>
          
          <Link 
                component={RouterLink}
                to='/carteira'> Carteira 
          </Link>
          <Link 
                component={RouterLink}
                to={ativo_link( carteira_param )}> Ativos 
          </Link>

        </Breadcrumbs>


        <Card  className={ classes.carteiraContainer}>
          <Typography variant="h4" color="primary">
            Ativo: {ativo.nome}
          </Typography>
          <Typography>
            {ativo.ehAtivoVariavel == 'true' ? 'renda variavel' : 'renda fixa' }
          </Typography>
          <Button 
              variant="contained"
              color="primary"
              onClick={()=>setOpenDialog(true)}> Adicionar Operação </Button>

        </Card>


        <Paper className={classes.operacoesContainer}>

          <Typography variant="h4" color="primary">
              Operações
          </Typography>

          {operacoes && operacoes.map( operacao => (
            <Box key={operacao.id}>
              <CardContent>
                qtd {operacao.qtd} | 
                custo {operacao.custo} |
                prazo {operacao.prazo} |
                data {operacao.data} |
                ação {operacao.tipoOperacao} |
              </CardContent>
              <Button
                onClick={ () => handleDelete( operacao.id )}
                variant="contained"
                color="secondary"> 
                Deletar
              </Button>
            </Box> ) 
          )  }

          </Paper>
    </Container>

  </>)
}

export default AtivoSingular