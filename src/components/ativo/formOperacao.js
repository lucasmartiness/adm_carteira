import React, {useState} from 'react'
import {AppBar,Toolbar,Typography , Container, makeStyles , Button, Box , Select , MenuItem , Grid , Paper , Dialog , DialogTitle, DialogContent , TextField} from '@material-ui/core'

const useStyle = makeStyles((style)=>({
  button:{
    marginLeft:'auto',
    display:"block",
    marginTop:"25px"
  }
}))

const FormOperacao = (props) => {

  let classes = useStyle()

  const handleClick = () => {
    let formData = {valor,data,qtd,tipoOperacao}
    
    if( props.EhAtivoVariavel == 'false')  formData = { ...formData, juros,prazo } 

   
    props.onSave( formData )
    
  }

  let [valor,setValor] = useState("")
  let [data,setData] = useState("2020-10-10")
  let [qtd,setQtd] = useState("")
  let [tipoOperacao,setTipo] = useState("C")
 
  let [juros,setJuros] = useState()
  let [prazo,setPrazo] = useState('2020-10-20')

  return(
    <Dialog onClose={props.onClose} open={props.open}>
      
      <DialogTitle>
        Adicionar uma operação ao ativo: {props.nome}
      </DialogTitle>

      <DialogContent>
      <Box>
        <TextField placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
      </Box>
      <Box>
        Data
        <TextField type="date" placeholder="Data" value={data} onChange={(e) => setData(e.target.value)} />
      </Box>
      <Box>
        <TextField type="number" placeholder="Quantidade" value={qtd} onChange={(e) => setQtd(e.target.value)} />
      </Box>
      <Box>
        <Select
          value={tipoOperacao}
          onChange={(e)=> setTipo( e.target.value)}
          placeholder="Operação"
        >
            <MenuItem value={"C"}>Comprar</MenuItem>
            <MenuItem value={"V"}>Vender</MenuItem>
            <MenuItem value={"D"}>Receber Proventos</MenuItem>
            <MenuItem value={"R"}>Resgatar Juros </MenuItem>
        </Select>
      </Box>

      
      <Box>
        {props.EhAtivoVariavel == 'false' && (
          <>
            <Box>
              <TextField type="number" placeholder="Juros" value={juros} onChange={(e) => setJuros(e.target.value)} />
            </Box>
            <Box>
              Prazo
              <TextField type="date" placeholder="Data" value={prazo} onChange={(e) => setPrazo(e.target.value)} />
            </Box>
          </>
        )}
      </Box>
        

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