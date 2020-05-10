
import React,{useState,useEffect} from 'react'
import Navbar from './navbar'
import {AppBar,Toolbar,Typography , Container, makeStyles , Link , Box , Button, Grid , TableRow, Breadcrumbs , Table , TableHead, TableBody,TableCell, Paper,Card,CardContent} from '@material-ui/core'
import FormOperacao from './formOperacao'
import firebase from './../../firebase'
// import HomeIcon from '@material-ui/icons/Home';

import {Link as RouterLink} from 'react-router-dom'

import {Operacao } from './../../src/Operacao'

import { Carteira as CarteiraAdmin } from './../../src/Carteira'

const operacoesRef = (carteira_id,ativo_id) => 
  firebase.firestore().collection("carteira/"+carteira_id+"/ativo/"+ativo_id+"/operacao")

const carteiraRef = () => firebase.firestore().collection("carteira")

const ativoRef = (carteira ) => firebase.firestore().collection("carteira/"+carteira+"/ativo")

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

function ShowOperacoes( {operacoes , handleDelete} ) {
  return(
    <Box style={{overflowX:"auto"}}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell> ID </TableCell> */}
            <TableCell> Patrimonio </TableCell>
            <TableCell> Quantidade </TableCell>
            <TableCell> Custo Unid. </TableCell>
            <TableCell> Prazo </TableCell>
            <TableCell> Data </TableCell>
            <TableCell> Atitude </TableCell>
            <TableCell> Ação </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        {operacoes && operacoes.map( operacao => (
              <TableRow key={operacao.id}>
                {/* <TableCell> {operacao.id}   </TableCell> */}
                <TableCell> {operacao.qtd * operacao.valor}   </TableCell>
                <TableCell> {operacao.qtd}    </TableCell>
                <TableCell> {operacao.valor}  </TableCell>
                <TableCell> {operacao.prazo || "-"}  </TableCell>
                <TableCell> {operacao.data} </TableCell>
                <TableCell> {operacao.tipoOperacao}  </TableCell>
  
                <TableCell>
                  <Button
                    onClick={ () => handleDelete( operacao.id )}
                    variant="contained"
                    color="secondary"> 
                    Deletar
                  </Button>
                </TableCell>
              </TableRow> ) 
            )  }
            

        </TableBody>
      </Table>
    </Box>  )
}

function AtivoSingular (props ) {


  let carteira_param = props.match.params.carteira
  let ativo_param = props.match.params.ativo 

  let classes = styles()

  let [ativo, setAtivo] = useState( { })
  let [operacoes, setOperacoes] = useState([])

  let [ carteiraDoc , setCarteiraDoc ] = useState({title:""})
  let [carteiraAdm, setCarteira] = useState( new CarteiraAdmin( carteira_param ) )

  let [openDialog, setOpenDialog] = useState(false)

  
  useEffect( () => {

    /** carregar um ativo */
    let unsubscribe = firebase
      .firestore()
      .collection("carteira/"+carteira_param+"/ativo/")
      .doc(ativo_param)
      .get()
      .then( ativo => {
        if(!ativo.exists){
          alert("not exists")
        }
        setAtivo( {...ativo.data(), id: ativo.id } )
        setCarteira( ativo.id , ativo.data().nome )
      })

        return () =>  unsubscribe  
        
  } , [props.match.url , openDialog ] )

  /** carregar dados da carteira */
  useEffect ( ( ) => {
    carteiraRef().doc(carteira_param).get().then( ( data ) => {
      
      setCarteiraDoc( data.data() )
    })
  },[props.match.url , openDialog])


  useEffect ( () => {

    /**carregar operações  */
    let unsubscribe =  
      operacoesRef( carteira_param , ativo_param )
        .get()
        .then( operacoes => {
          let operacoesTotal = operacoes.docs.map( operacao => {
            
              /** para cada operação atualize a carteira */
              let _carteira =  carteiraAdm
              
              let _ehAtivoFixo = operacao.data().ehAtivoVariavel == "true" ? false : true ;

              console.log("Operação ",operacao)
              
              const OperacaoNova = new Operacao( operacao.data().nome , parseFloat( operacao.data().valor ), parseFloat(  operacao.data().data ), operacao.data().tipoOperacao, parseInt( operacao.data().qtd ) )
              
              _carteira.adicionarAtivo ( OperacaoNova , _ehAtivoFixo , operacao.data().valor  )

              setCarteira(_carteira)
                          
              return { id:operacao.id , ...operacao.data() , detalhes: OperacaoNova   }

           })

          setOperacoes(operacoesTotal)

           return 

        }).then( () => {
          
          let patrimonio = carteiraAdm.valorPatrimonial(   ) 
          
          patrimonio = typeof patrimonio == "NaN" ? 0 : patrimonio
          ativoRef( carteira_param  ).doc(ativo_param).update( { patrimonio }).then( ( ) => console.log( "updated" ))
          // setAtivo( {...ativo,  patrimonio } )

          
         // new Operacao( "SMLS3" , 10.45,new Date(2020,11,10 ), TipoOperacao.Comprar , 6 )
          console.log("CARTEIRA",carteiraAdm)

           return
        } )
        .then( () => {
          console.log("(_ATIVO", ativo)
        })
        .catch( err => alert(err) )/** fim on snapshot */
        
        
        
    return () => unsubscribe
  } , [props.match.url , openDialog ])



  const handleSave = ( operacao ) => {

    operacoesRef( carteira_param , ativo_param ).add( operacao ) 
      .then( () => {
        console.log( operacao )
        setOpenDialog(false)
        
      })


      
  }


  const handleDelete = ( id ) => {
    operacoesRef( carteira_param , ativo_param )
      .doc(id)
      .delete()
      .then( () => {
        
        alert( "Operação deletada!")
        
      })
  }


  return(<>
    <Navbar />

    <FormOperacao 
        open={openDialog} 
        onClose={()=>setOpenDialog(false)}
        nome={ ativo.nome }
        onSave={handleSave}
        EhAtivoVariavel={ ativo.ehAtivoVariavel}  />
      
    <Container  className={classes.container} >
        
        <Card component={Box} mt={2} variant="outlined">
          <CardContent>
            <Breadcrumbs>
              <Link 
                    component={RouterLink}
                    to='/carteira'>
                    
                    Carteira 
              </Link>
              <Link 
                    component={RouterLink}
                    to={ativo_link( carteira_param )}> Ativos 
              </Link>
            </Breadcrumbs>
          </CardContent>
        </Card>


        <Card  className={ classes.carteiraContainer} variant="outlined" >
          <Typography>
            Carteira: {carteiraDoc.title}
          </Typography>

          <Typography variant="h4" color="primary">
            Ativo: {ativo.nome}
          </Typography>
          <Typography>
              Patrimonio R$<strong> { ativo.patrimonio } </strong>
          </Typography>
          <Typography style={{color:"#3F51B5"}}>
            {ativo.rotulo }
          </Typography>

          <Typography >
            {ativo.ehAtivoVariavel == 'true' ? 'renda variavel' : 'renda fixa' }
          </Typography>
         

          <Button 
              variant="contained"
              color="primary"
              onClick={()=>setOpenDialog(true)}> Adicionar Operação </Button>

        </Card>


        <Card className={classes.operacoesContainer} variant="outlined">
          <CardContent>

            <Typography variant="h4" color="primary">
                Operações
            </Typography>
            
            <ShowOperacoes operacoes={operacoes} handleDelete={handleDelete} />

          </CardContent>

          </Card>
    </Container>

  </>)
}

export default AtivoSingular