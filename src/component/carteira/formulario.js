import React ,{useEffect} from 'react'
import { Field, reduxForm } from 'redux-form'
 

let AtivoForm = props => {

  
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="firstName">Nome (unico) do ativo</label>
        <Field name="nome" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Preço</label>
        <Field name="custo" component="input" type="number" />
      </div>
      <div>
        <label htmlFor="email">Quantidade</label>
        <Field name="qtd" component="input" type="number" />
      </div>
      
      <div>
        <label htmlFor="email">Atitude</label>
        <Field  name="tipo" component="select">
            
            <option value="C">Comprar</option>
            <option value="V">Vender</option>
            <option value="J">Receber Dividendos/Proventos</option>
            <option value="D">Dividendos</option>
            <option value="R">Resgate</option>
          </Field>
      </div>

      <div>
        <label htmlFor="email">Tipo de Operacao</label>
        <Field name="TipoAtivo" component="select">
            <option value="false">Renda Fixa</option>
            <option value="true">Renda Variavel</option>
        </Field>
      </div>
      
      <div>
        <label htmlFor="email">Atrelação</label>
        <Field name="atrelacao" component="select">
            <option value="SELIC"> SELIC </option>
            <option value="CDI"> CDI </option>
            <option value="IBOV"> IBOV </option>
          </Field>
      </div>

      <div>
        <label htmlFor="email">Data de Compra </label>
        <Field name="dataInicio" component="input" type="date" />
      </div>
      <hr/>
      <div>
        <label htmlFor="email">Juros</label>
        <Field name="juros" component="input" type="number" />
      </div>

      <div>
        <label htmlFor="email">Data Fim </label>
        <Field name="dataFim" component="input" type="date" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

AtivoForm = reduxForm({
  // a unique name for the form
   
  form: 'ativo'
}) (AtivoForm)

export default AtivoForm