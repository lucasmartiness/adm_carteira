import React,{useState,useEffect} from 'react'
import Navbar from './navbar'
 
import firebase from './../../firebase'

import {AppBar,Toolbar,Typography , Card,CardContent, CircularProgress, Container, makeStyles , Breadcrumbs, Link , Box , Grid , Paper} from '@material-ui/core'
import AdicionarButton from '../carteira/adicionarButton'

import {Link as RouterLink} from 'react-router-dom'

import Ativo from './ativo'
import AtivoForm from './form'

import Grafic from './chart'

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

/** listagem de todos os ativos */
const AtivoComponent = ( props ) => {
  
  let classes = styles()
  let [ativos, setAtivos] = useState([])
  let [ carteira , setCarteira ] = useState()
  let [formOpen, setFormOpen] = useState(false)

 
  
  // carregar os dados da carteira => ex : title e ativos
  useEffect( () => {

     
    let unsubscribe = 
      ativoRef( props.match.params.carteira )
        .onSnapshot( (ativosCollection) => {
           
          
          setAtivos( ativosCollection.docs.map( ativo => {
            console.log( ativo )

            return  { id:ativo.id, ...ativo.data() }
          } ) )        
        })
        
      // return () => { unsubscribe ; }
  } , [props.match.url] )

  
  /** carregar carteira  */
  useEffect( () => {

    carteiraRef().doc( props.match.params.carteira)
    .get()
    .then( (d) => {
      setCarteira(  d.data() )
     
    })
    
   console.log(props.match.url)
  
  } , [props.match.url])

  /** atualizar patrimonio no banco de dados */
  useEffect( () => {

      ativoRef( props.match.params.carteira ).get().then( d => {

        let patrimonio = 0
        d.forEach( ativo => {
          if ( typeof ativo.data().patrimonio === "number" )
          {
            patrimonio += ativo.data().patrimonio 

            carteiraRef().doc( props.match.params.carteira).update({patrimonio})
          }

        })
    } )

    
  }, [carteira , props.match.url])


  /** inserir ativo sem deixar repetir o nome */
  const handleInsert = (data) => { 
    
    ativoRef(props.match.params.carteira).get()
      .then( (res) => {
        
        /** codigo para não permitir inserir dois ativos com o mesmo nome */
        let foundedSomeone = false
        
        res.forEach(ativo => {
          console.log( ativo.data().nome , data.nome )

          if(ativo.data().nome == data.nome){
            foundedSomeone = true
           
          }
        });

        if(foundedSomeone){
          throw( "Erro não é possivel adicionar o ativo com o mesmo nome")
        }
        return 
      })
      .then( () => {

          ativoRef(props.match.params.carteira).doc().set( {...data,patrimonio:0} ) 
          

      })
      .then( () => { alert("ativo adicionado") ; setFormOpen(false) })
      .catch( ( e ) => alert( e ) )

 
  }
  
  const handleDelete = ( data ) =>  ativoRef(props.match.params.carteira).doc(data).delete().then( () => alert("ativo deletado"))
  
  return(<>
    <AtivoForm  
      onClose={()=>setFormOpen(false) } 
      open={formOpen}
      onSave={handleInsert}/>

    <Navbar />
      <Container className={classes.container}>
        <Card component={Box} mt={2} variant="outlined">
          <CardContent>
            <Breadcrumbs>
              <Link 
                component={RouterLink}
                to='/carteira'
              > 
                Voltar 
              </Link>
            </Breadcrumbs>
          </CardContent>
        </Card>

        <Card className={ classes.carteiraContainer} variant="outlined"> 
          <Grid container>
            <Grid item style={{flexGrow:'1'}} >
              <Typography >
                Carteira <Typography variant="inline" color="primary"> <strong> {carteira && carteira.title} </strong> </Typography> 
              </Typography>
              <Typography>
                Patrimônio: 
                <Typography variant="inline" color="secondary"> 
                  <strong> 
                   { carteira && new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format( carteira.patrimonio.toFixed(2) ) }
                  </strong>
                </Typography>
              </Typography>
            </Grid> 
            <Grid item>
              {/* mostra o grafico de pizza dos ativos */}
              { ativos.length > 0 && (
                <Grafic 
                  ativos={ [ 
                    ["nome","patrimonio"] , 
                    ...ativos.map( ativoItem => ([  ativoItem.nome , ativoItem.patrimonio  ]) )   
                  ]}
                />
              )}
            </Grid>
          </Grid>
        </Card>
        <Card className={ classes.carteiraContainer} variant="outlined" > 

          <Typography variant="h4" component="h1"> Seus Ativos   </Typography>
          
          <Grid container >
             {ativos && ativos.map(
                ativo => 
                ( <Ativo
                       base={"/carteira/"+ props.match.params.carteira +"/ativo/" + ativo.id}
                        key={ativo.id} 
                        title={ ativo.nome}
                        id={ativo.id}  
                        onDelete={ () => handleDelete( ativo.id )}
                        patrimonio={ativo.patrimonio}
                        rotulo={ativo.rotulo}
                  />)    
              )}
          
            <AdicionarButton texto="adicionar" open={()=>setFormOpen(true)}    />
          </Grid> 
        </Card>
    </Container>
  </>)
}
export default AtivoComponent