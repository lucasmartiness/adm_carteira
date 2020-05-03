
const Operacao = require("./Operacao")
const AtivoFinanceiro = require("./AtivoFinanceiro")
class RendaVariavel extends AtivoFinanceiro {
 
  constructor(nome,cotacao){
    super(nome,cotacao,"Renda Variavel")
  }
}

module.exports = RendaVariavel