import React, {useState} from 'react'
import {AppBar,Toolbar,Typography , Container, makeStyles , Select, MenuItem, Button, Box , Grid , Paper , Dialog , DialogTitle, DialogContent , TextField} from '@material-ui/core'

const classes = makeStyles((style)=>({
  
}))

const FormCarteira = (props) => {

  let [nome,setNome] = useState(props.nome || null )
  let [ehAtivoVariavel,setAtivoVariavel] = useState( props.ehAtivoVariavel || 'false')
  let [rotulo,setRotulo] = useState( props.rotulo || 'acao')



  const handleClick = () => {



    props.onSave({nome,ehAtivoVariavel,rotulo})
    setNome("")
    
  }
  return(
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>
        Adicionar Um novo Ativo
      </DialogTitle>
      <DialogContent>
        
        <Box>
          <TextField placeholder="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </Box>

        <Box>
          <Select
              value={ehAtivoVariavel}
              onChange={(e)=> setAtivoVariavel( e.target.value )}
              placeholder="Tipo de ativo"
            >
                <MenuItem value={'false'}>Renda Fixa</MenuItem>
                <MenuItem value={'true'}>Renda Variavel</MenuItem>
            </Select>
        </Box>

        <Box>
          <Select
              value={rotulo}
              onChange={(e)=> setRotulo( e.target.value )}
              placeholder="Seu Ativo"
            >
                <MenuItem value={'acao'}>Ação</MenuItem>
                <MenuItem value={'fundo_imobiliario'}>Fundo Imobiliario</MenuItem>
                <MenuItem value={'titulo'}>Titulo renda fixa</MenuItem>
                <MenuItem value={'fundo_geral'}>Fundo</MenuItem>
                <MenuItem value={'fundo_de_emergencia'}>Reserva de Emergencia</MenuItem>
            </Select>
        </Box>

        <Button onClick={handleClick}> Salvar </Button>
      </DialogContent>
    </Dialog>
  )
}

export default FormCarteira