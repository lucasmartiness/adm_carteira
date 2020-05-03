import React, {useState,useEffect} from 'react'
import {AppBar,Toolbar,Typography , Container, makeStyles , Button, Box , Grid , Paper , Dialog , DialogTitle, DialogContent , TextField} from '@material-ui/core'

const classes = makeStyles((style)=>({
  
}))

const FormCarteira = (props) => {

  let [nome,setNome] = useState( props.nome || "" )

  const handleClick = () => {
    props.onSave(nome)
    setNome("")
  }

  useEffect( () => {
    setNome( props.nome )
  } , [props.nome])

  return(
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>
        Adicionar Uma nova carteira
      </DialogTitle>
      <DialogContent>
        <TextField placeholder="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <Button onClick={handleClick}> Salvar </Button>
      </DialogContent>
    </Dialog>
  )
}

export default FormCarteira