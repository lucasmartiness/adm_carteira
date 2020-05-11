
import Operacao from "./Operacao"
import AtivoFinanceiro from "./AtivoFinanceiro"
class RendaVariavel extends AtivoFinanceiro {
 
  constructor(nome,cotacao){
    super(nome,cotacao,"Renda Variavel")
  }
}

export default RendaVariavel