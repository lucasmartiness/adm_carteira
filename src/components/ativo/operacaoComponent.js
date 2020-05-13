
import React,{useState,useEffect} from 'react'
import Navbar from './navbar'

import {
  AppBar,
  Toolbar,  Typography ,
  Container,
  makeStyles ,
  Link ,
  Box ,
  Button,
  Grid ,
  TableRow,
  Breadcrumbs ,
  Table , TableHead, TableBody,TableCell,
  Paper,
  Card,CardContent,
  Dialog,DialogTitle,DialogContent,
  TextField,Select,MenuItem,
  Icon
} from '@material-ui/core'


import FormOperacao from './formOperacao'
import firebase from './../../firebase'
// import HomeIcon from '@material-ui/icons/Home';

import {Link as RouterLink} from 'react-router-dom'
import { Operacao } from './../../src/Operacao'
import { Carteira as CarteiraAdmin } from './../../src/Carteira'

const operacoesRef = (carteira_id,ativo_id) => firebase.firestore().collection("carteira/"+carteira_id+"/ativo/"+ativo_id+"/operacao")
const carteiraRef  = () => firebase.firestore().collection("carteira")
const ativoRef     = (carteira ) => firebase.firestore().collection("carteira/"+carteira+"/ativo")
const ativo_link   = ( carteira_param ) => "/carteira/"+carteira_param+"/ativo"


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

/** representa todos os dados do ativo como patrimonio, ele monta a carteira admin */
function AtivoSingular (props ) {


  let carteira_param = props.match.params.carteira
  let ativo_param = props.match.params.ativo 

  let classes = styles()

  let [ativo, setAtivo] = useState( { })
  let [operacoes, setOperacoes] = useState([])
  let [count, setCount ] = useState(1)
  let [ carteiraDoc , setCarteiraDoc ] = useState({title:""})


  /** tem todos os metodos para administrar a carteira e acessar os parametros
   * para conhecer lucro, patrimonio etc
   */
  let [carteiraAdm, setCarteira] = useState( new CarteiraAdmin( carteira_param ) )
 
  let [atualizarOperacao, setAtualizarOperacao] = useState( { id:null })

  /** ehInserir true ou ehAtualizar false */
  let [ ehInserir, setEhInserir ] = useState( true )
  let [openDialog, setOpenDialog] = useState(false)

  
  /** carregar dados do ativo */
  useEffect( () => {

    let unsubscribe = firebase
      .firestore()
      .collection("carteira/"+carteira_param+"/ativo/")
      .doc(ativo_param)
      .onSnapshot( ativo => {

        if(!ativo.exists){
          alert("not exists")
        }

        setAtivo( {...ativo.data(), id: ativo.id } )

      })

      return () =>  unsubscribe  
        
  } , [props.match.url   ] )

  /** carregar dados da carteira */
  useEffect ( ( ) => {
    let ref = carteiraRef().doc(carteira_param).get().then( ( data ) => {
      
      setCarteiraDoc( data.data() )
    })
    return () => ref 
  },[props.match.url , openDialog])

  /**carregar e atualiza todas as OPERAÇÕES somente,
   * NELE A CARTEIRA ADM É CRIADA
  */
  useEffect ( () => {

    let unsubscribe =  
      operacoesRef( carteira_param , ativo_param )
        .onSnapshot( operacoes => {

          console.log( "update inside CARTEIRA ADM")
          //let _carteira =  carteiraAdm
           let _carteira =  new CarteiraAdmin( carteira_param , ativo.nome )

          let operacoesTotal = operacoes.docs.map( operacao => {
            
              /** determina o tipo de ativo se é fixo ou variavel, pois cada tipo tem seus próprios calculos */
              let _ehAtivoFixo = ativo.ehAtivoVariavel == "true" ? false : true ;
            
            /** para cada operação atualize a carteira */
              const OperacaoNova = new Operacao( 
                ativo.nome ,
                parseFloat( operacao.data().valor ), 
                operacao.data().data ,
                operacao.data().tipoOperacao,
                parseInt( operacao.data().qtd ),
                operacao.data().prazo,
                parseFloat( operacao.data().juros ),
              )
             
          //   console.log( "COTAÇÃO ",parseFloat ( ativo.cotacao || 0) )

              _carteira.adicionarAtivo ( 
                OperacaoNova ,
                _ehAtivoFixo , 
                parseFloat( ativo.cotacao ) || parseFloat( operacao.data().valor )  
              )
                          
              return { id:operacao.id , ...operacao.data() , detalhes: OperacaoNova   }
           })
           
           
           console.log("CARTEIRA",_carteira)

           
           /** modificar patrimonio e outros dados como lucro */
            let patrimonio =  _carteira.valorPatrimonial(   )  || 0
            let lucroRealizado =  _carteira.lucroProvisorioTotal() || 0
            let lucroRealizadoRelativo =  _carteira.lucroProvisorioTotalRelativo()  || 0
            
            //console.log("LUCRO ", _carteira.lucroCarteiraRealizado() )

            patrimonio = typeof patrimonio === "NaN" ? 0 : patrimonio
             
             ativoRef( carteira_param  )
              .doc(ativo_param)
              .update( { 
                patrimonio: patrimonio ,
                lucroRealizado,
                lucroRealizadoRelativo
              })
              .then( ( ) => { 
                console.log( "updated patrimonio" ) ;
              })
             
             setOperacoes(operacoesTotal)
             setCarteira(_carteira)


              // console.log("CARTEIRA",_carteira)  console.log("Operação ", operacoesTotal )                      console.log( "_Carteira" , _carteira )   
        })
        /** fim carregar operações */
    return () => unsubscribe
  } , [props.match.url  , count ,  openDialog , carteiraAdm.valorPatrimonial(   )   ])


  /** save from forms new operation */
  const handleSave = ( operacao /** operacao for save or update */,id /**id for update */ ) => {

    if( ehInserir /*&& id != null*/  ){

      /** validar operação */

      /** fim validar */
      operacoesRef( carteira_param , ativo_param ).add( operacao ) 
      .then( () => {
        console.log( operacao )
        setOpenDialog(false)
        setCount( count + 1 )      
      })//
    }
    else{

      /** validar operação */


      /** fim validar */
      // update    
      firebase.firestore()
        .collection("carteira/"+carteira_param+"/ativo/"+ativo_param+"/operacao")
        .doc( id )
        .update( operacao )
        .then( () => {
          alert( "ativo atualizado" ) 
        } )
    }
  }

  const handleDelete = ( id ) => {
    operacoesRef( carteira_param , ativo_param )
      .doc(id)
      .delete()
      .then( () => {
        
        setOpenDialog(false)

       // alert( "Operação deletada!")
        setCount( count + 1)
      })
  }


  return(<>
    <Navbar />
    {/* formulario para permitir adicionar uma operação ao ativo */}
    <FormOperacao 
      open={openDialog} 
      onClose={()=>setOpenDialog(false)}
      nome={ ativo.nome }
      onSave={handleSave}
      EhAtivoVariavel={ ativo.ehAtivoVariavel} 
      ehInserir={ ehInserir}
      idOperacao={atualizarOperacao.id}
      carteiraId={carteira_param }
      ativoId={ativo_param } 
    />
    <Container  className={classes.container} >
        
      <LinkHeader 
        RouterLink={RouterLink}
        carteiraParam={carteira_param } />
      {/* mostra um resumo dos dados do ativo */}
      <AtivoDataHeader
        ativo={ativo} 
        carteiraDoc={carteiraDoc}
        carteiraAdm={carteiraAdm}
        setOpenDialog={setOpenDialog}
        setEhInserir={setEhInserir}
        carteira_param={carteira_param}
        ativo_param={ativo_param}
      />
      <Card className={classes.operacoesContainer} variant="outlined">
        <CardContent>
          <Typography variant="h4" color="primary">
              Operações
          </Typography>
          <ShowOperacoes 
            operacoes={operacoes} 
            handleDelete={handleDelete}
            handleAtualizar={(id) => { setEhInserir(false ) ; setAtualizarOperacao({id}) ; setOpenDialog(true) }} 
          />
        </CardContent>
      </Card>
    </Container>
  </>)
}/** fim metodo ativo singular */

/**mostra os dados da carteira e permite atualiar ela atraves do formulario imbutido */
function AtivoDataHeader(
   {
    ativo, 
    carteiraDoc,
    carteiraAdm,
    setOpenDialog, 
    setEhInserir ,
    carteira_param ,
    ativo_param  
    }
){

  let [updateFormState,setUpdateFormDialog] = useState(false)


  function FormUpdate({ativo,open,onClose}) {
    
    let [ativoForm , setAtivoForm] = useState(
      {
        nome:ativo.nome ,
        ehAtivoVariavel:ativo.ehAtivoVariavel,
        rotulo: ativo.rotulo,
        cotacao: ativo.cotacao || ativo.valor,
      }
    )

  /** formulario de atualização do ativo que permite mudar o nome do ativo */
    function submitUpdateForm(){

      
      if( ativoForm.nome == "" ){
        alert("por favor preencha o nome")
      }
      else{
          let unsubscribe = firebase
          .firestore()
          .collection("carteira/"+carteira_param+"/ativo/")
          .doc(ativo_param)
          .update( ativoForm )
          .then( () => {
            
            setUpdateFormDialog(false)
          })
      }
      
    }
  /** formulario de atualização do ativo que permite mudar o nome do ativo */
    return(
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography> Atualizar Ativo {ativo.nome} </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField 
            placeholder="nome"
            value={ativoForm.nome}
            onChange={(e) => setAtivoForm ( { ...ativoForm , nome:  e.target.value } )}
            fullWidth 
          />
           <TextField 
            placeholder="Cotacao"
            value={ativoForm.cotacao}
            onChange={(e) => setAtivoForm ( { ...ativoForm , cotacao:  e.target.value } )}
            fullWidth 
          />
          <Select
            value={ativoForm.ehAtivoVariavel}
            onChange={(e)=>  setAtivoForm ( { ...ativoForm , ehAtivoVariavel:  e.target.value } ) }
            placeholder="Tipo de ativo"  
            fullWidth 
             >
              <MenuItem value={'false'}>Renda Fixa</MenuItem>
              <MenuItem value={'true'}>Renda Variavel</MenuItem>
          </Select>
          <Select
              value={ativoForm.rotulo}
              onChange={(e)=> setAtivoForm ( { ...ativoForm , rotulo:  e.target.value } ) }
              placeholder="Seu Ativo"
              fullWidth 
            >
              <MenuItem value={'acao'}>Ação</MenuItem>
              <MenuItem value={'fundo_imobiliario'}>Fundo Imobiliario</MenuItem>
              <MenuItem value={'titulo'}>Titulo renda fixa</MenuItem>
              <MenuItem value={'fundo_geral'}>Fundo</MenuItem>
              <MenuItem value={'fundo_de_emergencia'}>Reserva de Emergencia</MenuItem>
          </Select>
          <Grid my={2} component={Box}>
            <Button
              variant="outlined"
              color="primary"
              onClick={()=>submitUpdateForm()}
              > Atualizar </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
  /** fim do formulario de atualização */
  
  let classes = styles()

  /** painel que mostra os dados do ativo como nome,patrimonio , lucro*/
  return( <>
    <FormUpdate
      ativo={ativo}
      open={updateFormState}
      onClose={()=>setUpdateFormDialog(false)}
      setOpenDialog={setOpenDialog} />


    <Card  className={ classes.carteiraContainer} variant="outlined" >
      <Grid container>
        <Grid style={{flexGrow:"1"}}>

          <Typography>
            Carteira: {carteiraDoc.title}
          </Typography>

          <Typography variant="h4" color="primary">
            {"Ativo "}: {ativo.nome}
          </Typography>

          <Typography>
              Patrimonio
              <strong> 
                { ativo.patrimonio && new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format( ativo.patrimonio.toFixed(2) ) }
              </strong>
          </Typography>

          <Typography>
              Quantidade:  <strong> { carteiraAdm && carteiraAdm.qtdOperacoes} </strong>
          </Typography>
          <Typography >
            Lucro Valor Provisorio:  {   ativo.lucroRealizado && new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format( ativo.lucroRealizado  )  }
          </Typography>
          <Typography >
            Lucro Provisorio: { ativo.lucroRealizadoRelativo && Math.floor( ativo.lucroRealizadoRelativo )} %
          </Typography>

          { ativo && ativo.cotacao && (
            <Typography>
                Cotacao:  
                <strong>                
                  { ativo.cotacao && new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format( ativo.cotacao  ) }
                </strong>
            </Typography>
          )}


          {/* <Typography style={{color:"#3F51B5"}}>
            {ativo.rotulo }
          </Typography> */}

          <Typography >
            <strong>
            {ativo.ehAtivoVariavel == 'true' ? 'renda variavel' : 'renda fixa' }
            </strong>
          </Typography>

          <Button 
              variant="contained"
              color="primary"
              onClick={()=> { setOpenDialog(true) ; setEhInserir(true)  } }>
              <Icon>add</Icon>
              Adicionar Operação 
          </Button>
        </Grid>

        <Grid>
            <Button 
              color="secondary"
              variant="contained"
              onClick={() =>setUpdateFormDialog(true) }>
              <Icon>create</Icon>
              Atualizar Ativo
            </Button>
        </Grid>
      </Grid>
    </Card>
  </>
  )
}

/** renderiza os links que ficam no breadcrumbs */
function LinkHeader( {RouterLink,carteiraParam}){
  return(
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
                to={ativo_link( carteiraParam )}> Ativos 
          </Link>
        </Breadcrumbs>
      </CardContent>
    </Card>
  )
}

/** tabela que mostra as operações que o usuario fez */
function ShowOperacoes( {operacoes , handleDelete , handleAtualizar} ) {
  return(
    <Box style={{overflowX:"auto"}}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell> ID </TableCell> */}
            <TableCell> Patrimonio </TableCell>
            <TableCell> Quantidade </TableCell>
            <TableCell> Custo Unid. </TableCell>
            <TableCell> Data </TableCell>
            <TableCell> Atitude </TableCell>
            <TableCell> Juros </TableCell>
            <TableCell> Prazo </TableCell>
            <TableCell> Ação </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        {operacoes && operacoes.map( operacao => (
              <TableRow key={operacao.id}>
                {/* <TableCell> {operacao.id}   </TableCell> */}
                <TableCell> { new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format( parseFloat( operacao.qtd * operacao.valor ).toFixed(2) )  }   </TableCell>
                <TableCell> {operacao.qtd}    </TableCell>
                <TableCell>  { new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format( parseFloat(operacao.valor).toFixed(2) )  }  </TableCell>
                <TableCell> {operacao.data} </TableCell>
                <TableCell> {operacao.tipoOperacao}  </TableCell>
                <TableCell> {operacao.juros || "-" } </TableCell>
                <TableCell> {operacao.prazo || "-"}  </TableCell>
  
                <TableCell>
                  <Button
                    onClick={ () => handleDelete( operacao.id )}
                    variant="contained"
                    color="secondary"> 
                    <Icon>delete</Icon>
                  </Button>
                  
                  <Button
                    onClick={ () => handleAtualizar( operacao.id )}
                    variant="contained"
                    component={Box}
                    mx={2}
                    color="primary"> 
                    <Icon>edit</Icon>
                  </Button>
                </TableCell>
              </TableRow> ) 
            )  }    
        </TableBody>
      </Table>
    </Box>  )
}



export default AtivoSingular