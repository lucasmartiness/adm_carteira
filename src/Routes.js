import {Home} from './component/home.js'
import {Carteiras} from './components/carteira/carteiraComponent'
import Ativo from './components/ativo/ativoComponent'
import AtivoSingular from './components/ativo/ativoSingular'
 
export const routesConfig = [
   { path:"/" , component:Home, exact:true} ,
   { path:"/carteira" , component:Carteiras, exact:true} ,
   { path:"/carteira/:carteira" , component:Ativo, exact:true} ,
   { path:"/carteira/:carteira/ativo" , component:Ativo, exact:true} ,
   { path:"/carteira/:carteira/ativo/:ativo" , component:AtivoSingular, exact:true} ,
]
