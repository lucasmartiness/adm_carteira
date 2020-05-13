import React, {useState,useEffect} from 'react'
import {AppBar,Toolbar,Typography , Container, FormControl, makeStyles , Button, Box , Select , MenuItem , Grid , Paper , Dialog , DialogTitle, DialogContent , TextField} from '@material-ui/core'
import firebase from './../../firebase'


const useStyle = makeStyles((style)=>({
  button:{
    marginLeft:'auto',
    display:"block",
    marginTop:"25px"
  },
  textField:{
    margin: "5px"
  }
}))

const FormOperacao = (props) => {

  /** o codigo tá feio eu sei */
  let [valor,setValor] = useState("")
  let [data,setData] = useState( "2020-10-10")
  let [qtd,setQtd] = useState(  1 )
  let [tipoOperacao,setTipo] = useState( "C")
  let [juros,setJuros] = useState("1")
  let [prazo,setPrazo] = useState( '2020-10-20')
  // let [cotacao,setCotacao] = useState( )
  let [id, setId] = useState( props.idOperacao || null)

  let classes = useStyle()

  /** quando o usuario submeter o formulario para criar um novo ou atualizar */
  const handleClick = () => {

    let formData = {valor,data,qtd,tipoOperacao}

    if( props.EhAtivoVariavel == 'false')  formData = { ...formData, juros,prazo } 
    // if( cotacao ) formData = { ...formData, cotacao }

    if( valor != null || valor != ""){

      props.onSave( formData , id )
    }
    else{
      alert("Erro, por favor coloque o nome ")
    }
  }

 
  useEffect( ()=>{


    if( !props.ehInserir && props.idOperacao !== null  && props.open ){
      // na verdade o usuario quer atualizar e não inserir algo novo
      // então pegue os valores do BANCO DE DADOS para usar de base atualizar
      
      setId( props.idOperacao )

      firebase.firestore()
        .collection("carteira/"+props.carteiraId+"/ativo/"+props.ativoId+"/operacao")
        .doc( props.idOperacao )
        .get()
        .then( (data) => {

          console.log("DATA TO UPDATE: ",data.data())
          if( data.data().prazo != null )  setPrazo( data.data().prazo ) 
          
          setData( data.data().data ) // mudar data de compra
          setJuros( data.data().juros )
          setValor( data.data().valor )
          setQtd( data.data().qtd)
          setTipo( data.data().tipoOperacao ) 
        
        })
    }
    else{
      setValor("")
      setData("2020-10-10")
      setQtd("1")
      setTipo("C")
      setPrazo('2020-10-20')
      setJuros("")
    }
  } , [ props.open ])
  


  return(
    <Dialog onClose={props.onClose} open={props.open}>
      
      <DialogTitle>
        Adicionar uma operação ao ativo: {props.nome}
      </DialogTitle>

      <DialogContent>
        <Grid  container >
          <Grid>
            <Typography> Custo </Typography>
            <TextField  
              placeholder="exemplo: 45.55"
              value={valor}
              onChange={(e) => setValor(e.target.value)} 
              className={classes.textField}
            />
          </Grid>
          <Grid>
            <Typography> Quantidade </Typography>
            <TextField 
              type="number" 
              placeholder="ex: 10" 
              value={qtd}
              onChange={(e) => setQtd(e.target.value)}
              className={classes.textField}
              style={{width:"80px"}}
              required
            />
          </Grid>
          {/* <Grid>
            <Typography> Cotação </Typography>
            <TextField  
              placeholder="exemplo: 45.55"
              value={cotacao}
              onChange={(e) => setCotacao(e.target.value)} 
              className={classes.textField}
            />
          </Grid> */}

        </Grid>
        <FormControl fullWidth>
          <Typography> Data </Typography>
          <TextField 
            type="date"
            placeholder="Data"
            value={data} 
            onChange={(e) => setData(e.target.value)} 
          />
        </FormControl>  
        <FormControl fullWidth>
          <Typography> Ação </Typography>

          <Select
            value={tipoOperacao}
            onChange={(e)=> setTipo( e.target.value)}
            placeholder="Operação"
            className={classes.textField}
          >
              <MenuItem value={"C"}>Comprar</MenuItem>
              <MenuItem value={"V"}>Vender</MenuItem>
              <MenuItem value={"D"}>Receber Proventos</MenuItem>
              <MenuItem value={"R"}>Resgatar Juros </MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          {props.EhAtivoVariavel == 'false' && (
            <>
              <Box>
                <Typography> Juros </Typography>
                <TextField 
                  type="number"
                  placeholder="exemplo: 1.5 que é 1.5%AA"
                  value={juros}
                  onChange={(e) => setJuros(e.target.value)}
                  className={classes.textField}
                  style={{width:"184px"}}
                />
              </Box>
              <Box>
                <Typography>Prazo</Typography>
                <TextField 
                  type="date"
                  placeholder="Data"
                  value={prazo}
                  onChange={(e) => setPrazo(e.target.value)} 
                  className={classes.textField}  
                />
              </Box>
            </>
          )}
        </FormControl>
        <Grid >
          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            className={classes.button}> Realizar Ação </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default FormOperacao