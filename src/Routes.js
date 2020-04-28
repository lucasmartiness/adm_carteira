import {Home} from './component/home.js'
import Carteira from './component/carteira/carteira'
import Carteiras from './component/carteira/carteiras'
import Operacoes from './component/operacao/operacoes'
import Operacao from './component/operacao/operacao'

export const routesConfig = [
   { path:"/" , component:Home, exact:true} ,
   { path:"/carteiras/:id" , component:Carteira, exact:true} ,
   { path:"/carteiras" , component:Carteiras, exact:true} ,
   { path:"/carteiras/:id/operacoes/:op" , component:Operacao , exact:true} ,
   { path:"/carteiras/:id/operacoes/" , component:Operacoes, exact:true} ,
  // { path:"/candidatos" , component: CandidatosComponent , exact:true} ,
  // { path:"/candidatos/:id" , component: CandidatosComponent , exact:true} ,
  // { path:"/ranking" , component: RankingComponent , exact:true} ,
  // { path:"/login" , component: Login , exact:true},
  // { path:"/signup" , component: Cadastro , exact:true},
]