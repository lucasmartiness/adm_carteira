import React,{useState,useEffect} from 'react'
import data from './../../data/data.js'
import {Carteira as carteira} from './../../src/Carteira'
import DeleteIcon from '@material-ui/icons/Delete';

import {Link} from 'react-router-dom'

import firebase from '../../firebase'

import {AppBar,Toolbar,makeStyles,Typography,Paper,List,Grid,Button,Input,TextField,IconButton} from '@material-ui/core'

const useStyle = makeStyles( theme => ({
  grid: {
    display: "flex",
    flexDirection:"column"
  },
  list:{

  },
  list_item:{
    padding: "16px 8px 4px 8px",
    margin: "8px",
    
  },
  list_typo:{
    display:"inline-block"
  }
}))

const useCarteiras = () => {
  const [carteiras,setCarteira] = useState([])

  useEffect( () => {
    const uns = firebase.firestore().collection("carteira")
      .onSnapshot(( carteiras ) => {

        const carteirasCarregadas = carteiras.docs.map( carteira => ({id:carteira.id, ...carteira.data() }) )

        setCarteira (carteirasCarregadas)
      })

      return () => uns()
    
  },[])

  return carteiras
}

const InputForm = ( props ) => {

  let [ nome,setNome ] = useState("") 

  const add = (e) => {
    e.preventDefault()

   firebase.firestore().collection('carteira').
    add({title:nome})
    .then(()=> {

      setNome("")

    })
  }
  return <form onSubmit={add}>
      <Typography variant="h6"> Adicionar Carteira </Typography>
      <div >
          <TextField value={nome} 
                      onChange={(e)=>setNome(e.target.value)} 
                      label="Nome"/>
          <Button variant="contained"   type="submit"> Adicionar Carteira </Button>

      </div>
  </form>
}
const Carteira = (props) => {

  let  carteiras = useCarteiras();
  let style = useStyle()


  const handleAdicionarCarteira = () => {
    
    firebase.firestore().collection('carteira').add(  {nome:"teste"} )
  }

  const handleDelete = ( id ) => {
    firebase.firestore().collection("carteira").doc(id).delete();
  }

  return (<Grid container className={style.grid}>
    <InputForm />
    <Grid container className={style.list}>
    {
      carteiras && carteiras.map( carteira => (
        <Paper className={style.list_item} key={carteira.id} md="3" xs="12" >

          <Typography className={style.list_typo}> Nome: {carteira.title} </Typography>
          <Link to={"/carteiras/"+ carteira.id}>  Carteira  </Link>
         
          <IconButton  variant="contained" color="secondary"  onClick={()=>handleDelete(carteira.id)} > 
            <DeleteIcon/>
          </IconButton>

        </Paper> ) )
    }


    </Grid>
    {/* Carteiras: {data.carteira && data.carteira.map( carteira => (
      <div key={carteira.id}>
        Nome: {carteira.nome} |
        Patrimonio: {carteira.valorPatrimonial(   )} | 
        <Link to={"/carteiras/"+ (carteira.id-1)}> Carteira </Link> | 
        <Link to={"/carteiras/"+ (carteira.id-1)+"/operacoes"}> Operações </Link>
      </div>
    ))} */}

    {/* <button onClick={()=> handleAdicionarCarteira( ) } > adicionar carteira </button> */}

  </Grid>)
}
export default Carteira