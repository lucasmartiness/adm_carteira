(this["webpackJsonpapp-votacao"]=this["webpackJsonpapp-votacao"]||[]).push([[0],{144:function(e,a,t){e.exports=t(250)},250:function(e,a,t){"use strict";t.r(a);var o=t(0),n=t.n(o),r=t(10),i=t.n(r),l=t(131),c=t(59),u=t(304),s=Object(c.b)({form:u.a}),m=Object(c.c)(s),d=t(41),v=t(22),p=t(7),h=t(18),f=t(93),E=t.n(f);t(227);E.a.initializeApp({apiKey:"AIzaSyD49GnV25MVPCggX6231YaJWI777nZZnbI",authDomain:"app-carteira-inv.firebaseapp.com",databaseURL:"https://app-carteira-inv.firebaseio.com",projectId:"app-carteira-inv",storageBucket:"app-carteira-inv.appspot.com",messagingSenderId:"178456734181",appId:"1:178456734181:web:14b6909faa43c59338a70c"});var b=E.a,O=t(278),g=t(303),j=t(295),y=t(283),C=t(133),A=t(280),R=t(282),x=t(284),k=t(285),P=t(286),N=t(287),V=Object(O.a)((function(e){return{container:{margin:"10px"},card:{width:"100%",minHeight:"100px"},text:{fontSize:"14px",fontWeight:"bold"},button:{width:"100%"},red:{color:"red"},blue:{color:"blue"},cardFooter:{position:"absolute",bottom:"0px"},cardFooterButtonContainer:{marginRight:"40px"}}})),q=function(e){var a=V(),t=Object(d.f)();return n.a.createElement(A.a,{item:!0,xs:12,sm:5,md:5,lg:2,className:a.container},n.a.createElement(R.a,{className:a.button},n.a.createElement(y.a,{className:a.card,variant:"outlined"},n.a.createElement(x.a,{onClick:function(){t.push("/carteira/"+e.id)}},n.a.createElement(C.a,{className:a.text,variant:"h2",align:"left"},e.title)),n.a.createElement(k.a,{className:a.cardFooter},n.a.createElement(P.a,{onClick:e.delete,color:"secondary"},n.a.createElement(N.a,null,"delete")),n.a.createElement(P.a,{onClick:e.update},n.a.createElement(N.a,null,"edit"))))))},S=Object(O.a)((function(e){return{container:{marginTop:"18px"},card:{width:"100%",minHeight:"100px"},text:{fontSize:"25px"},button:{width:"100%"}}})),z=function(e){var a=S();return n.a.createElement(A.a,{xs:12,sm:5,md:5,lg:2,className:a.container},n.a.createElement(R.a,{className:a.button,onClick:function(){e.open()}},n.a.createElement(y.a,{className:a.card,variant:"outlined"},n.a.createElement(x.a,null,n.a.createElement(C.a,{variant:"body2"},e.texto),n.a.createElement(C.a,{className:a.text,variant:"h6",align:"center"},n.a.createElement(N.a,null,"add_circle"))))))},F=t(288),T=t(289),w=Object(O.a)((function(e){return{appbar:{position:"relative"}}})),D=function(e){var a=w();return n.a.createElement(F.a,{className:a.appbar},n.a.createElement(T.a,null,n.a.createElement(C.a,null,"Carteira")))},I=t(308),M=t(290),L=t(291),_=t(307),B=(Object(O.a)((function(e){return{}})),function(e){var a=Object(o.useState)(e.nome||""),t=Object(p.a)(a,2),r=t[0],i=t[1];return Object(o.useEffect)((function(){i(e.nome)}),[e.nome]),n.a.createElement(I.a,{onClose:e.onClose,open:e.open},n.a.createElement(M.a,null,"Adicionar Uma nova carteira"),n.a.createElement(L.a,null,n.a.createElement(_.a,{placeholder:"nome",value:r,onChange:function(e){return i(e.target.value)}}),n.a.createElement(R.a,{onClick:function(){e.onSave(r),i("")}}," Salvar ")))}),J=function(){return b.firestore().collection("carteira")},W=Object(O.a)((function(e){return{carteiraContainer:{padding:"20px",marginTop:"40px"},container:{margin:"auto auto"},topContainer:{display:"flex",justifyContent:"center",width:"100%"}}})),H=function(e){var a=W();Object(o.useEffect)((function(){var e=J().onSnapshot((function(e){var a=e.docs.map((function(e){return Object(h.a)({id:e.id},e.data())}));l(a),console.log(a)}));return function(){return e()}}),[e.match.url]);var t=Object(o.useState)([]),r=Object(p.a)(t,2),i=r[0],l=r[1],c=Object(o.useState)(!1),u=Object(p.a)(c,2),s=u[0],m=u[1],d=Object(o.useState)({id:0,update:!1,fields:{nome:""}}),v=Object(p.a)(d,2),f=v[0],E=v[1];return n.a.createElement(n.a.Fragment,null,n.a.createElement(B,{onClose:function(){return m(!s)},open:s,onSave:function(e){return a=e,void(f.update?(J().doc(f.id).set({title:a}).then((function(){return m(!1)})),E({id:0,update:!1,fields:{nome:""}})):J().add({title:a}).then((function(){return m(!1)})));var a},nome:f.fields.nome}),n.a.createElement(D,null),n.a.createElement(g.a,{bgColor:"green",className:a.topContainer},n.a.createElement(j.a,{className:a.container},n.a.createElement(y.a,{className:a.carteiraContainer,variant:"outlined"},n.a.createElement(C.a,null,"Suas"),n.a.createElement(C.a,{variant:"h4",component:"h1"},"Carteiras"),n.a.createElement(A.a,{container:!0,spacing:2},i&&i.map((function(e){return n.a.createElement(q,{key:e.id,title:e.title,id:e.id,delete:function(){return a=e.id,J().doc(a).delete();var a},update:function(){return a=e.id,void J().doc(a).get().then((function(e){console.log(e.data().title),E({id:a,update:!0,fields:{nome:e.data().title}}),m(!0)}));var a}})})),n.a.createElement(z,{texto:"Adicionar",open:function(){return m(!0)}}))))))},U=t(25),Q=Object(O.a)((function(e){return{appbar:{position:"relative"}}})),Y=function(e){var a=Q();return n.a.createElement(F.a,{className:a.appbar},n.a.createElement(T.a,null,n.a.createElement(C.a,null,"Ativo")))},G=t(309),X=t(297),Z=[];Z.acao="A\xe7\xe3o",Z.titulo="Titulo",Z.fundo_de_emergencia="Fundo de Emergencia",Z.fundo_imobiliario="Fundo Imobiliario";var K=Object(O.a)((function(e){return{container:{margin:"10px"},card:{width:"100%"},text:{fontSize:"14px",fontWeight:"bold",textTransform:"capitalize"},button:{width:"100%"},cardAction:{display:"flex",justifyContent:"center"}}})),$=function(e){var a=K(),t=Object(d.f)();return n.a.createElement(A.a,{xs:12,sm:5,md:5,lg:2,className:a.container},n.a.createElement(R.a,{className:a.button},n.a.createElement(y.a,{className:a.card,variant:"outlined"},n.a.createElement(x.a,{onClick:function(){t.push(e.base)}},n.a.createElement(C.a,{variant:"subtitle2",align:"left",style:{fontSize:"12px"}},Z[e.rotulo]||"Ativo"),n.a.createElement(C.a,{className:a.text,variant:"body1",color:"primary",align:"left"},e.title),n.a.createElement(C.a,{className:a.text,variant:"h2",color:"secondary",align:"left"},"Patrimonio ",new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e.patrimonio.toFixed(2)))),n.a.createElement(k.a,{className:a.cardAction},n.a.createElement(R.a,{variant:"contained",color:"secondary",onClick:e.onDelete},"Deletar")))))},ee=t(305),ae=t(311),te=(Object(O.a)((function(e){return{}})),function(e){var a=Object(o.useState)(e.nome||null),t=Object(p.a)(a,2),r=t[0],i=t[1],l=Object(o.useState)(e.ehAtivoVariavel||"false"),c=Object(p.a)(l,2),u=c[0],s=c[1],m=Object(o.useState)(e.rotulo||"acao"),d=Object(p.a)(m,2),v=d[0],h=d[1];return n.a.createElement(I.a,{onClose:e.onClose,open:e.open},n.a.createElement(M.a,null,"Adicionar Um novo Ativo"),n.a.createElement(L.a,null,n.a.createElement(g.a,null,n.a.createElement(_.a,{placeholder:"nome",value:r,onChange:function(e){return i(e.target.value)}})),n.a.createElement(g.a,null,n.a.createElement(ee.a,{value:u,onChange:function(e){return s(e.target.value)},placeholder:"Tipo de ativo"},n.a.createElement(ae.a,{value:"false"},"Renda Fixa"),n.a.createElement(ae.a,{value:"true"},"Renda Variavel"))),n.a.createElement(g.a,null,n.a.createElement(ee.a,{value:v,onChange:function(e){return h(e.target.value)},placeholder:"Seu Ativo"},n.a.createElement(ae.a,{value:"acao"},"A\xe7\xe3o"),n.a.createElement(ae.a,{value:"fundo_imobiliario"},"Fundo Imobiliario"),n.a.createElement(ae.a,{value:"titulo"},"Titulo renda fixa"),n.a.createElement(ae.a,{value:"fundo_geral"},"Fundo"),n.a.createElement(ae.a,{value:"fundo_de_emergencia"},"Reserva de Emergencia"))),n.a.createElement(R.a,{onClick:function(){e.onSave({nome:r,ehAtivoVariavel:u,rotulo:v}),i("")}}," Salvar ")))}),oe=t(129),ne=t(296);function re(e){var a=e.ativos;return console.log("dados>",a),n.a.createElement(oe.a,{component:g.a,width:"350px",height:"350px",chartType:"PieChart",data:a,loader:n.a.createElement(ne.a,null),options:{pieStartAngle:90,legend:"label"}})}var ie=function(){return b.firestore().collection("carteira")},le=function(e){return b.firestore().collection("carteira/"+e+"/ativo")},ce=Object(O.a)((function(e){return{carteiraContainer:{padding:"20px",marginTop:"40px"},container:{}}})),ue=function(e){var a=ce(),t=Object(o.useState)([]),r=Object(p.a)(t,2),i=r[0],l=r[1],c=Object(o.useState)(),u=Object(p.a)(c,2),s=u[0],m=u[1],d=Object(o.useState)(!1),f=Object(p.a)(d,2),E=f[0],b=f[1];Object(o.useEffect)((function(){le(e.match.params.carteira).onSnapshot((function(e){l(e.docs.map((function(e){return console.log(e),Object(h.a)({id:e.id},e.data())})))}))}),[e.match.url]),Object(o.useEffect)((function(){ie().doc(e.match.params.carteira).get().then((function(e){m(e.data())})),console.log(e.match.url)}),[e.match.url]),Object(o.useEffect)((function(){le(e.match.params.carteira).get().then((function(a){var t=0;a.forEach((function(a){"number"===typeof a.data().patrimonio&&(t+=a.data().patrimonio,ie().doc(e.match.params.carteira).update({patrimonio:t}))}))}))}),[s,e.match.url]);return n.a.createElement(n.a.Fragment,null,n.a.createElement(te,{onClose:function(){return b(!1)},open:E,onSave:function(a){le(e.match.params.carteira).get().then((function(e){var t=!1;if(e.forEach((function(e){console.log(e.data().nome,a.nome),e.data().nome==a.nome&&(t=!0)})),t)throw"Erro n\xe3o \xe9 possivel adicionar o ativo com o mesmo nome"})).then((function(){le(e.match.params.carteira).doc().set(Object(h.a)({},a,{patrimonio:0}))})).then((function(){alert("ativo adicionado"),b(!1)})).catch((function(e){return alert(e)}))}}),n.a.createElement(Y,null),n.a.createElement(j.a,{className:a.container},n.a.createElement(y.a,{component:g.a,mt:2,variant:"outlined"},n.a.createElement(x.a,null,n.a.createElement(G.a,null,n.a.createElement(X.a,{component:v.b,to:"/carteira"},"Voltar")))),n.a.createElement(y.a,{className:a.carteiraContainer,variant:"outlined"},n.a.createElement(A.a,{container:!0},n.a.createElement(A.a,{item:!0,style:{flexGrow:"1"}},n.a.createElement(C.a,null,"Carteira ",n.a.createElement(C.a,{variant:"inline",color:"primary"}," ",n.a.createElement("strong",null," ",s&&s.title," ")," ")),n.a.createElement(C.a,null,"Patrim\xf4nio:",n.a.createElement(C.a,{variant:"inline",color:"secondary"},n.a.createElement("strong",null,s&&new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(s.patrimonio.toFixed(2)))))),n.a.createElement(A.a,{item:!0},i.length>0&&n.a.createElement(re,{ativos:[["nome","patrimonio"]].concat(Object(U.a)(i.map((function(e){return[e.nome,e.patrimonio]}))))})))),n.a.createElement(y.a,{className:a.carteiraContainer,variant:"outlined"},n.a.createElement(C.a,{variant:"h4",component:"h1"}," Seus Ativos   "),n.a.createElement(A.a,{container:!0},i&&i.map((function(a){return n.a.createElement($,{base:"/carteira/"+e.match.params.carteira+"/ativo/"+a.id,key:a.id,title:a.nome,id:a.id,onDelete:function(){return t=a.id,le(e.match.params.carteira).doc(t).delete().then((function(){return alert("ativo deletado")}));var t},patrimonio:a.patrimonio,rotulo:a.rotulo})})),n.a.createElement(z,{texto:"adicionar",open:function(){return b(!0)}})))))},se=t(298),me=t(299),de=t(300),ve=t(301),pe=t(302),he=t(294),fe=Object(O.a)((function(e){return{button:{marginLeft:"auto",display:"block",marginTop:"25px"},textField:{margin:"5px"}}})),Ee=function(e){var a=Object(o.useState)(""),t=Object(p.a)(a,2),r=t[0],i=t[1],l=Object(o.useState)("2020-10-10"),c=Object(p.a)(l,2),u=c[0],s=c[1],m=Object(o.useState)(1),d=Object(p.a)(m,2),v=d[0],f=d[1],E=Object(o.useState)("C"),O=Object(p.a)(E,2),j=O[0],y=O[1],x=Object(o.useState)("1"),k=Object(p.a)(x,2),P=k[0],N=k[1],V=Object(o.useState)("2020-10-20"),q=Object(p.a)(V,2),S=q[0],z=q[1],F=Object(o.useState)(e.idOperacao||null),T=Object(p.a)(F,2),w=T[0],D=T[1],B=fe();return Object(o.useEffect)((function(){!e.ehInserir&&null!==e.idOperacao&&e.open?(D(e.idOperacao),b.firestore().collection("carteira/"+e.carteiraId+"/ativo/"+e.ativoId+"/operacao").doc(e.idOperacao).get().then((function(e){console.log("DATA TO UPDATE: ",e.data()),null!=e.data().prazo&&z(e.data().prazo),s(e.data().data),N(e.data().juros),i(e.data().valor),f(e.data().qtd),y(e.data().tipoOperacao)}))):(i(""),s("2020-10-10"),f("1"),y("C"),z("2020-10-20"),N(""))}),[e.open]),n.a.createElement(I.a,{onClose:e.onClose,open:e.open},n.a.createElement(M.a,null,"Adicionar uma opera\xe7\xe3o ao ativo: ",e.nome),n.a.createElement(L.a,null,n.a.createElement(A.a,{container:!0},n.a.createElement(A.a,null,n.a.createElement(C.a,null," Custo "),n.a.createElement(_.a,{placeholder:"exemplo: 45.55",value:r,onChange:function(e){return i(e.target.value)},className:B.textField})),n.a.createElement(A.a,null,n.a.createElement(C.a,null," Quantidade "),n.a.createElement(_.a,{type:"number",placeholder:"ex: 10",value:v,onChange:function(e){return f(e.target.value)},className:B.textField,style:{width:"80px"},required:!0}))),n.a.createElement(he.a,{fullWidth:!0},n.a.createElement(C.a,null," Data "),n.a.createElement(_.a,{type:"date",placeholder:"Data",value:u,onChange:function(e){return s(e.target.value)}})),n.a.createElement(he.a,{fullWidth:!0},n.a.createElement(C.a,null," A\xe7\xe3o "),n.a.createElement(ee.a,{value:j,onChange:function(e){return y(e.target.value)},placeholder:"Opera\xe7\xe3o",className:B.textField},n.a.createElement(ae.a,{value:"C"},"Comprar"),n.a.createElement(ae.a,{value:"V"},"Vender"),n.a.createElement(ae.a,{value:"D"},"Receber Proventos"),n.a.createElement(ae.a,{value:"R"},"Resgatar Juros "))),n.a.createElement(he.a,null,"false"==e.EhAtivoVariavel&&n.a.createElement(n.a.Fragment,null,n.a.createElement(g.a,null,n.a.createElement(C.a,null," Juros "),n.a.createElement(_.a,{type:"number",placeholder:"exemplo: 1.5 que \xe9 1.5%AA",value:P,onChange:function(e){return N(e.target.value)},className:B.textField,style:{width:"184px"}})),n.a.createElement(g.a,null,n.a.createElement(C.a,null,"Prazo"),n.a.createElement(_.a,{type:"date",placeholder:"Data",value:S,onChange:function(e){return z(e.target.value)},className:B.textField})))),n.a.createElement(A.a,null,n.a.createElement(R.a,{onClick:function(){var a={valor:r,data:u,qtd:v,tipoOperacao:j};"false"==e.EhAtivoVariavel&&(a=Object(h.a)({},a,{juros:P,prazo:S})),null!=r||""!=r?e.onSave(a,w):alert("Erro, por favor coloque o nome ")},variant:"contained",color:"primary",className:B.button}," Realizar A\xe7\xe3o "))))},be=t(44),Oe=t(62),ge=t(27),je=t(36),ye=t(84),Ce=t(81),Ae=(t(44),function(){function e(a){var t=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0;Object(ge.a)(this,e),this.operacoes=[],this.valorCotacao=0,this.patrimonio=0,this.tipo="",this.pegarOperacoes=function(){return t.operacoes},this.nome=a,this.valorCotacao=o,this.tipo=n}return Object(je.a)(e,[{key:"buscarValorCotacao",value:function(){}},{key:"calcularCustoDeCompra",value:function(){return this.qtdAtivosEmPosse()*this.calcularMediaCompra()}},{key:"calcularMediaCompra",value:function(){return this.totalCompra()/this.qtdAtivosComprados()}},{key:"calcularMediaVenda",value:function(){return isNaN(this.totalVenda()/this.qtdAtivosVendidos())?0:this.totalVenda()/this.qtdAtivosVendidos()}},{key:"valorPatrimonial",value:function(){return this.qtdAtivosEmPosse()*this.calcularMediaCompra()}},{key:"valorPatrimonialCotacao",value:function(e){return this.qtdAtivosEmPosse()*(e||this.valorCotacao)}},{key:"lucroRelativoNaoRealizado",value:function(e){return this.valorPatrimonialCotacao(e||this.valorCotacao)/this.valorPatrimonial()*100-100}},{key:"lucroNaoRealizado",value:function(e){return this.valorPatrimonialCotacao(e||this.valorCotacao)-this.valorPatrimonial()}},{key:"lucroRealizado",value:function(){var e=this.calcularMediaVenda()*this.qtdAtivosVendidos()-this.calcularMediaCompra()*this.qtdAtivosVendidos();return isNaN(e)&&(e=0),e}},{key:"lucroRealizadoRelativo",value:function(){return this.lucroRealizado()/this.valorPatrimonial()*100}},{key:"lucroTotal",value:function(){return this.lucroRealizado()+this.lucroNaoRealizado()}},{key:"lucroTotalRelativo",value:function(){return this.valorCotacao||console.warn("Aten\xe7\xe3o n\xe3o foi passado o pre\xe7o da cota\xe7\xe3o, ent\xe3o n\xe3o ser\xe1 possivel calcular o lucro realizado"),(this.lucroRealizado()+this.lucroNaoRealizado())/this.valorPatrimonial()*100}},{key:"totalCompra",value:function(){return this.operacoes.reduce((function(e,a){var t=a.valor,o=a.tipo,n=a.qtd;return e+("C"==o?t*n:0)}),0)}},{key:"totalVenda",value:function(){return this.operacoes.reduce((function(e,a){var t=a.valor,o=a.tipo,n=a.qtd;return e+("V"==o?t*n:0)}),0)}},{key:"calcularDiferencaTotalCompraVenda",value:function(){return Math.abs(this.totalVenda()-this.totalCompra())}},{key:"qtdAtivosComprados",value:function(){var e=this.operacoes.reduce((function(e,a){return e+("C"==a.tipo?a.qtd:0)}),0);return Math.abs(e)}},{key:"qtdAtivosVendidos",value:function(){var e=this.operacoes.reduce((function(e,a){return e+("V"==a.tipo?a.qtd:0)}),0);return isNaN(e)?0:Math.abs(e)}},{key:"qtdAtivosEmPosse",value:function(){return Math.abs(this.qtdAtivosComprados()-this.qtdAtivosVendidos())}},{key:"qtd",value:function(){return this.qtdAtivosEmPosse()}}]),e}()),Re=function(e){Object(ye.a)(t,e);var a=Object(Ce.a)(t);function t(e,o,n){var r;return Object(ge.a)(this,t),(r=a.call(this,e,o,"Renda Fixa")).atrelacao="SELIC",r.jurosMedio=r.calcularMediaJuros(),r.atrelacao=n,r}return Object(je.a)(t,[{key:"calcularTempoPassadoEmAnos",value:function(){}},{key:"calcularMediaJuros",value:function(){var e=0;return this.operacoes.reduce((function(a,t){var o=t.juros,n=t.tipo,r=t.qtd;return"C"==n&&(e+=r),a+("C"==n?o*r:0)}),0)/(e||1)}},{key:"valorMedioCompraComJuros",value:function(){return this.calcularMediaCompra()+this.calcularMediaJuros()}},{key:"lucroRealizado",value:function(e){e||(e=this.qtdAtivosVendidos()+this.qtdAtivosRealizados());var a=this.calcularMediaJuros()*e;return isNaN(a)&&(a=0),a}},{key:"lucroRealizadoRelativo",value:function(){console.warn("attt",this.qtdAtivosComprados());var e=this.lucroRealizado()/this.valorPatrimonial()*100;return isFinite(e)?e:0}},{key:"lucroTotal",value:function(){return this.lucroRealizado(this.qtdAtivosComprados())}},{key:"lucroTotalRelativo",value:function(){var e=this.lucroTotal()/this.valorPatrimonial()*100;return isFinite(e)?e:0}},{key:"qtdAtivosRealizadosEVendidos",value:function(){return this.qtdAtivosVendidos()+this.qtdAtivosRealizados()}},{key:"calcularMediaVenda",value:function(){var e=this.totalVenda()/this.qtdAtivosRealizadosEVendidos();return isNaN(e)?0:e}},{key:"totalVenda",value:function(){var e=this.operacoes.reduce((function(e,a){var t=a.valor,o=a.tipo,n=a.qtd;return e+("V"==o?t*n:0)}),0);return!isNaN(e)&&e||(e=0),e+this.totalRealizados()}},{key:"calcularMediaRealizados",value:function(){return this.totalRealizados()/this.qtdAtivosRealizados()}},{key:"totalRealizados",value:function(){return this.operacoes.reduce((function(e,a){var t=a.valor,o=a.tipo,n=a.qtd;return e+("R"==o?t*n:0)}),0)}},{key:"qtdAtivosRealizados",value:function(){var e=this.operacoes.reduce((function(e,a){return e+("R"==a.tipo?a.qtd:0)}),0);return Math.abs(e)}}]),t}(Ae),xe=function(e){Object(ye.a)(t,e);var a=Object(Ce.a)(t);function t(e,o){return Object(ge.a)(this,t),a.call(this,e,o,"Renda Variavel")}return t}(Ae),ke=t(16),Pe=t.n(ke),Ne=t(43),Ve=t(232),qe=function(){var e=Object(Ne.a)(Pe.a.mark((function e(a,t){return Pe.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"5T9PSLWSUIE8115V",console.log(a),e.next=4,Ve("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+a+".SA&apikey=5T9PSLWSUIE8115V").then((function(e){var a={};a=(a=(a=Object.entries(e.data["Time Series (Daily)"])).map((function(e){return e[1]})))[0]["4. close"],t(a)}));case 4:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),Se=function(){function e(a,t){var o=this;Object(ge.a)(this,e),this.id=0,this.RendaFixa=[],this.RendaVariavel=[],this.RendaTotal=function(){return[].concat(Object(U.a)(o.RendaVariavel),Object(U.a)(o.RendaFixa))},this.TodosAtivos=function(){return o.RendaTotal()},this.dinheiro=0,this.patrimonio=this.valorPatrimonial(),this.nome="",this.proporcoes=[],this.listaOperacoes=[],this.listaValorPatrimonialHistorico=[],this.qtdOperacoes=0,this.id=a,this.nome=t}return Object(je.a)(e,[{key:"adicionarAtivo",value:function(e){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"SELIC";this.listaValorPatrimonialHistorico.push({vp:this.valorPatrimonial(),lucro:this.lucroCarteiraRealizadoRelativo(),lucroProvisorio:this.lucroProvisorioTotalRelativo()}),this.listaOperacoes.sort((function(e,a){return new Date(e.operacao.data)-new Date(a.operacao.data)})),this.listaOperacoes.push({operacao:e}),"C"==e.tipo&&(this.qtdOperacoes+=e.qtd);var n=this.TodosAtivos().find((function(a){return a.nome==e.nomeAtivo}));if(null!=n){if("V"==e.tipo){var r=this.ObterAtivoPeloNome(e.nomeAtivo);if(this.qtdOperacoes-=e.qtd,this.dinheiro+=e.qtd*e.valor,r&&e.qtd>r.qtdAtivosEmPosse())throw"erro n\xe3o \xe9 possivel remover mais ativos nessa opera\xe7\xe3o, talves voce n\xe3o tenha tantos ativosp para remover, tente remover menos"}else if("R"==e.tipo){var i=this.ObterAtivoPeloNome(e.nomeAtivo);if(this.qtdOperacoes-=e.qtd,this.dinheiro+=i.valorMedioCompraComJuros()*e.qtd,console.log("ativo ","qtd ",e.qtd,"juros",i.calcularMediaJuros(),"valor venda",e.valor),i&&e.qtd>i.qtdAtivosEmPosse())throw"erro n\xe3o \xe9 possivel remover mais ativos nessa opera\xe7\xe3o, talves voce n\xe3o tenha tantos ativosp para remover, tente remover menos"}var l=function(a){a.nome==e.nomeAtivo&&(a.operacoes.push(e),0!=t&&(a.valorCotacao=t||a.valorCotacao||0))};a?this.RendaFixa.forEach(l):this.RendaVariavel.forEach(l)}else{var c=a?new Re(e.nomeAtivo,t,o):new xe(e.nomeAtivo,t);c.operacoes.push(e);a?this.RendaFixa.push(c):this.RendaVariavel.push(c)}}},{key:"valorPatrimonialTotal",value:function(){return this.valorPatrimonial()+this.dinheiro}},{key:"valorPatrimonialRendaFixa",value:function(){return this.RendaFixa.reduce((function(e,a){return e+a.valorPatrimonial()}),0)}},{key:"valorPatrimonialRendaVariavel",value:function(){return this.RendaVariavel.reduce((function(e,a){return e+a.valorPatrimonial()}),0)}},{key:"valorPatrimonial",value:function(){return this.TodosAtivos().reduce((function(e,a){return e+a.valorPatrimonial()}),0)}},{key:"lucroCarteiraRealizado",value:function(){return this.TodosAtivos().reduce((function(e,a){return e+(isNaN(a.lucroRealizado())?0:a.lucroRealizado())}),0)}},{key:"lucroCarteiraRealizadoRelativo",value:function(){return this.lucroCarteiraRealizado()/this.totalCompra()*100}},{key:"lucroProvisorioTotal",value:function(){return this.TodosAtivos().reduce((function(e,a){return e+a.lucroTotal()}),0)}},{key:"lucroProvisorioTotalRelativo",value:function(){return this.lucroProvisorioTotal()/this.totalCompra()*100}},{key:"valorPatrimonialCotacao",value:function(){return this.TodosAtivos().reduce((function(e,a){return e+a.valorPatrimonialCotacao(e.valorCotacao)}),0)}},{key:"caixaRelativo",value:function(){return this.dinheiro/this.valorPatrimonial()*100}},{key:"historico",value:function(){var e=this,a=[],t=1;return this.OrdenarOperacao(),this.listaOperacoes.forEach((function(o){var n,r=o.operacao;t>=e.listaOperacoes.length-t||(a.push((n={nome:r.nomeAtivo,preco:r.valor,data:r.data,qtd:r.qtd,tipo:r.tipo,juros:r.juros,jurosAA:r.jurosAA,qtdTempoAnos:r.qtdTempoAnos,lucro:e.lucroProvisorioTotalRelativo(),vpa:e.listaValorPatrimonialHistorico[t].vp},Object(Oe.a)(n,"lucro",e.listaValorPatrimonialHistorico[t].lucro),Object(Oe.a)(n,"lucroProvisorio",e.listaValorPatrimonialHistorico[t].lucroProvisorio),n)),t++)})),a}},{key:"totalCompra",value:function(){return this.TodosAtivos().reduce((function(e,a){return e+a.totalCompra()}),0)}},{key:"OrdenarHistorico",value:function(){this.historico.sort((function(e,a){return new Date(e.data)-new Date(a.data)}))}},{key:"OrdenarOperacao",value:function(){this.operacoes().sort((function(e,a){return new Date(e.data)-new Date(a.data)}))}},{key:"ObterAtivosLista",value:function(){var e=this.RendaTotal(),a=[];return e.forEach((function(e){a=[].concat(Object(U.a)(a),[e.nome])})),a}},{key:"ObterAtivoPeloNome",value:function(e){var a=!1;return void 0==(a=this.RendaVariavel.find((function(a){return a.nome==e})))&&(a=this.RendaFixa.find((function(a){return a.nome==e}))),a}},{key:"buscarValorCotacao",value:function(){this.RendaVariavel.forEach((function(e){var a=e.nome;try{qe(a,(function(a){e.cotacao=Number(a)}))}catch(t){throw"Erro n\xe3o foi possivel consultar o nome pelo ativo, provavelmente o nome est\xe1 errado, por favor consulte pela sigla do ativo com o numero exemplo itausa: ITSA3"}}))}},{key:"operacoes",value:function(){var e=this.TodosAtivos(),a=[];return e.forEach((function(e){var t=e.operacoes;a=[].concat(Object(U.a)(a),[t])})),a}},{key:"historicoMensal",value:function(){var e=this.historico();console.log(e);var a=[];return e.forEach((function(e){var t="t"+(e.data.getMonth()+1)+e.data.getFullYear();if(null!=t){var o=0,n=0,r="";if(null!=a[t]){o=a[t].lucroProvisorio;isNaN(o);n=a[t].vpa,isNaN(n)?0:n,r+=e.nome+" ",r+=a[t].nome}else r=e.nome;a[t]={data:e.data.getMonth()+1+"/"+e.data.getFullYear(),nome:r,lucroProvisorio:isNaN(e.lucroProvisorio+o)?0:e.lucroProvisorio+o,vpa:isNaN(e.vpa+n)?0:e.vpa+n}}})),a}},{key:"calcucarProporcoesRendaVariavel",value:function(){var e=this,a=[];return[].concat(Object(U.a)(this.RendaVariavel),Object(U.a)(this.RendaFixa)).forEach((function(t){var o=t.valorPatrimonial()/e.valorPatrimonialTotal()*100;a.push({nome:t.nome,proporcao:o,rentabilidadeProvisoria:t.lucroTotalRelativo(),rentabilidade:t.lucroRealizadoRelativo()})})),this.proporcoes=a,a}},{key:"gerarDadosRendaVariavelPatrimonio",value:function(){var e=this,a=[];return[].concat(Object(U.a)(this.RendaVariavel),Object(U.a)(this.RendaFixa)).forEach((function(t){t.valorPatrimonial(),e.valorPatrimonialTotal();a.push({patrimonio:t.valorPatrimonial()})})),this.proporcoes=a,a}},{key:"adicionarDinheiro",value:function(e){this.dinheiro+=e}},{key:"removerAtivoId",value:function(e){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];a?this.RendaFixa.filter((function(a){return a.id!=e})):this.RendaVariavel.filter((function(a){return a.id!=e}))}},{key:"removerAtivoNome",value:function(e){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];a?this.RendaFixa.filter((function(a){return a.nome!=e})):this.RendaVariavel.filter((function(a){return a.nome!=e}))}}]),e}(),ze=function(e,a){return b.firestore().collection("carteira/"+e+"/ativo/"+a+"/operacao")},Fe=Object(O.a)((function(e){return{carteiraContainer:{padding:"20px",marginTop:"40px"},container:{},operacoesContainer:{marginTop:"60px",padding:"20px"}}}));function Te(e){var a=e.ativo,t=e.carteiraDoc,r=e.carteiraAdm,i=e.setOpenDialog,l=e.setEhInserir,c=e.carteira_param,u=e.ativo_param,s=Object(o.useState)(!1),m=Object(p.a)(s,2),d=m[0],v=m[1];function f(e){var a=e.ativo,t=e.open,r=e.onClose,i=Object(o.useState)({nome:a.nome,ehAtivoVariavel:a.ehAtivoVariavel,rotulo:a.rotulo,cotacao:a.cotacao||a.valor}),l=Object(p.a)(i,2),s=l[0],m=l[1];return n.a.createElement(I.a,{open:t,onClose:r},n.a.createElement(M.a,null,n.a.createElement(C.a,null," Atualizar Ativo ",a.nome," ")),n.a.createElement(L.a,null,n.a.createElement(_.a,{placeholder:"nome",value:s.nome,onChange:function(e){return m(Object(h.a)({},s,{nome:e.target.value}))},fullWidth:!0}),n.a.createElement(_.a,{placeholder:"Cotacao",value:s.cotacao,onChange:function(e){return m(Object(h.a)({},s,{cotacao:e.target.value}))},fullWidth:!0}),n.a.createElement(ee.a,{value:s.ehAtivoVariavel,onChange:function(e){return m(Object(h.a)({},s,{ehAtivoVariavel:e.target.value}))},placeholder:"Tipo de ativo",fullWidth:!0},n.a.createElement(ae.a,{value:"false"},"Renda Fixa"),n.a.createElement(ae.a,{value:"true"},"Renda Variavel")),n.a.createElement(ee.a,{value:s.rotulo,onChange:function(e){return m(Object(h.a)({},s,{rotulo:e.target.value}))},placeholder:"Seu Ativo",fullWidth:!0},n.a.createElement(ae.a,{value:"acao"},"A\xe7\xe3o"),n.a.createElement(ae.a,{value:"fundo_imobiliario"},"Fundo Imobiliario"),n.a.createElement(ae.a,{value:"titulo"},"Titulo renda fixa"),n.a.createElement(ae.a,{value:"fundo_geral"},"Fundo"),n.a.createElement(ae.a,{value:"fundo_de_emergencia"},"Reserva de Emergencia")),n.a.createElement(A.a,{my:2,component:g.a},n.a.createElement(R.a,{variant:"outlined",color:"primary",onClick:function(){return function(){if(""==s.nome)alert("por favor preencha o nome");else b.firestore().collection("carteira/"+c+"/ativo/").doc(u).update(s).then((function(){v(!1)}))}()}}," Atualizar "))))}var E=Fe();return n.a.createElement(n.a.Fragment,null,n.a.createElement(f,{ativo:a,open:d,onClose:function(){return v(!1)},setOpenDialog:i}),n.a.createElement(y.a,{className:E.carteiraContainer,variant:"outlined"},n.a.createElement(A.a,{container:!0},n.a.createElement(A.a,{style:{flexGrow:"1"}},n.a.createElement(C.a,null,"Carteira: ",t.title),n.a.createElement(C.a,{variant:"h4",color:"primary"},"Ativo ",": ",a.nome),n.a.createElement(C.a,null,"Patrimonio",n.a.createElement("strong",null,a.patrimonio&&new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(a.patrimonio.toFixed(2)))),n.a.createElement(C.a,null,"Quantidade:  ",n.a.createElement("strong",null," ",r&&r.qtdOperacoes," ")),n.a.createElement(C.a,null,"Lucro Valor Provisorio:  ",a.lucroRealizado&&new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(a.lucroRealizado)),n.a.createElement(C.a,null,"Lucro Provisorio: ",a.lucroRealizadoRelativo&&Math.floor(a.lucroRealizadoRelativo)," %"),a&&a.cotacao&&n.a.createElement(C.a,null,"Cotacao:",n.a.createElement("strong",null,a.cotacao&&new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(a.cotacao))),n.a.createElement(C.a,null,n.a.createElement("strong",null,"true"==a.ehAtivoVariavel?"renda variavel":"renda fixa")),n.a.createElement(R.a,{variant:"contained",color:"primary",onClick:function(){i(!0),l(!0)}},n.a.createElement(N.a,null,"add"),"Adicionar Opera\xe7\xe3o")),n.a.createElement(A.a,null,n.a.createElement(R.a,{color:"secondary",variant:"contained",onClick:function(){return v(!0)}},n.a.createElement(N.a,null,"create"),"Atualizar Ativo")))))}function we(e){var a,t=e.RouterLink,o=e.carteiraParam;return n.a.createElement(y.a,{component:g.a,mt:2,variant:"outlined"},n.a.createElement(x.a,null,n.a.createElement(G.a,null,n.a.createElement(X.a,{component:t,to:"/carteira"},"Carteira"),n.a.createElement(X.a,{component:t,to:(a=o,"/carteira/"+a+"/ativo")}," Ativos"))))}function De(e){var a=e.operacoes,t=e.handleDelete,o=e.handleAtualizar;return n.a.createElement(g.a,{style:{overflowX:"auto"}},n.a.createElement(se.a,null,n.a.createElement(me.a,null,n.a.createElement(de.a,null,n.a.createElement(ve.a,null," Patrimonio "),n.a.createElement(ve.a,null," Quantidade "),n.a.createElement(ve.a,null," Custo Unid. "),n.a.createElement(ve.a,null," Data "),n.a.createElement(ve.a,null," Atitude "),n.a.createElement(ve.a,null," Juros "),n.a.createElement(ve.a,null," Prazo "),n.a.createElement(ve.a,null," A\xe7\xe3o "))),n.a.createElement(pe.a,null,a&&a.map((function(e){return n.a.createElement(de.a,{key:e.id},n.a.createElement(ve.a,null," ",new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(parseFloat(e.qtd*e.valor).toFixed(2)),"   "),n.a.createElement(ve.a,null," ",e.qtd,"    "),n.a.createElement(ve.a,null,"  ",new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(parseFloat(e.valor).toFixed(2)),"  "),n.a.createElement(ve.a,null," ",e.data," "),n.a.createElement(ve.a,null," ",e.tipoOperacao,"  "),n.a.createElement(ve.a,null," ",e.juros||"-"," "),n.a.createElement(ve.a,null," ",e.prazo||"-","  "),n.a.createElement(ve.a,null,n.a.createElement(R.a,{onClick:function(){return t(e.id)},variant:"contained",color:"secondary"},n.a.createElement(N.a,null,"delete")),n.a.createElement(R.a,{onClick:function(){return o(e.id)},variant:"contained",component:g.a,mx:2,color:"primary"},n.a.createElement(N.a,null,"edit"))))})))))}var Ie=[{path:"/",component:H,exact:!0},{path:"/carteira",component:H,exact:!0},{path:"/carteira/:carteira",component:ue,exact:!0},{path:"/carteira/:carteira/ativo",component:ue,exact:!0},{path:"/carteira/:carteira/ativo/:ativo",component:function(e){var a=e.match.params.carteira,t=e.match.params.ativo,r=Fe(),i=Object(o.useState)({}),l=Object(p.a)(i,2),c=l[0],u=l[1],s=Object(o.useState)([]),m=Object(p.a)(s,2),d=m[0],f=m[1],E=Object(o.useState)(1),O=Object(p.a)(E,2),g=O[0],A=O[1],R=Object(o.useState)({title:""}),k=Object(p.a)(R,2),P=k[0],N=k[1],V=Object(o.useState)(new Se(a)),q=Object(p.a)(V,2),S=q[0],z=q[1],F=Object(o.useState)({id:null}),T=Object(p.a)(F,2),w=T[0],D=T[1],I=Object(o.useState)(!0),M=Object(p.a)(I,2),L=M[0],_=M[1],B=Object(o.useState)(!1),J=Object(p.a)(B,2),W=J[0],H=J[1];return Object(o.useEffect)((function(){var e=b.firestore().collection("carteira/"+a+"/ativo/").doc(t).onSnapshot((function(e){e.exists||alert("not exists"),u(Object(h.a)({},e.data(),{id:e.id}))}));return function(){return e}}),[e.match.url]),Object(o.useEffect)((function(){var e=b.firestore().collection("carteira").doc(a).get().then((function(e){N(e.data())}));return function(){return e}}),[e.match.url,W]),Object(o.useEffect)((function(){var e=ze(a,t).onSnapshot((function(e){console.log("update inside CARTEIRA ADM");var o=new Se(a,c.nome),n=e.docs.map((function(e){var a="true"!=c.ehAtivoVariavel,t=new be.Operacao(c.nome,parseFloat(e.data().valor),e.data().data,e.data().tipoOperacao,parseInt(e.data().qtd),e.data().prazo,parseFloat(e.data().juros));return o.adicionarAtivo(t,a,parseFloat(c.cotacao)||parseFloat(e.data().valor)),Object(h.a)({id:e.id},e.data(),{detalhes:t})}));console.log("CARTEIRA",o);var r,i=o.valorPatrimonial()||0,l=o.lucroProvisorioTotal()||0,u=o.lucroProvisorioTotalRelativo()||0;i="NaN"===typeof i?0:i,(r=a,b.firestore().collection("carteira/"+r+"/ativo")).doc(t).update({patrimonio:i,lucroRealizado:l,lucroRealizadoRelativo:u}).then((function(){console.log("updated patrimonio")})),f(n),z(o)}));return function(){return e}}),[e.match.url,g,W,S.valorPatrimonial()]),n.a.createElement(n.a.Fragment,null,n.a.createElement(Y,null),n.a.createElement(Ee,{open:W,onClose:function(){return H(!1)},nome:c.nome,onSave:function(e,o){L?ze(a,t).add(e).then((function(){console.log(e),H(!1),A(g+1)})):b.firestore().collection("carteira/"+a+"/ativo/"+t+"/operacao").doc(o).update(e).then((function(){alert("ativo atualizado")}))},EhAtivoVariavel:c.ehAtivoVariavel,ehInserir:L,idOperacao:w.id,carteiraId:a,ativoId:t}),n.a.createElement(j.a,{className:r.container},n.a.createElement(we,{RouterLink:v.b,carteiraParam:a}),n.a.createElement(Te,{ativo:c,carteiraDoc:P,carteiraAdm:S,setOpenDialog:H,setEhInserir:_,carteira_param:a,ativo_param:t}),n.a.createElement(y.a,{className:r.operacoesContainer,variant:"outlined"},n.a.createElement(x.a,null,n.a.createElement(C.a,{variant:"h4",color:"primary"},"Opera\xe7\xf5es"),n.a.createElement(De,{operacoes:d,handleDelete:function(e){ze(a,t).doc(e).delete().then((function(){H(!1),A(g+1)}))},handleAtualizar:function(e){_(!1),D({id:e}),H(!0)}})))))},exact:!0}];Object(O.a)((function(e){return{appbar:{display:"block",position:"relative"}}}));var Me=function(){return Ie.map((function(e,a){return n.a.createElement(d.a,{path:e.path,exact:e.exact,key:a,component:e.component})}))};var Le=function(e){return n.a.createElement("div",{className:"App"},n.a.createElement(A.a,{container:!0},n.a.createElement(v.a,null,n.a.createElement(d.c,null,n.a.createElement(Me,null)))))};i.a.render(n.a.createElement(l.a,{store:m},n.a.createElement(Le,null)),document.getElementById("root"))},44:function(e,a,t){"use strict";t.r(a),t.d(a,"Operacao",(function(){return i})),t.d(a,"TipoOperacao",(function(){return r}));var o=t(27),n=t(36),r={Comprar:"C",Vender:"V",Jsp:"J",Dividendos:"D",Resgate:"R"},i=function(){function e(a,t,n,r,i,l,c,u){Object(o.a)(this,e),this.nomeAtivo=a,this.id=u||Math.random(),this.valor=t,this.data=n||new Date,this.tipo=r,this.qtd=i,this.juros=this.calcularJuros(c,this.calcularQtdAnos(n,l)),this.jurosAA=c,this.qtdTempoAnos=this.calcularQtdAnos(n,l),this.prazo=l}return Object(n.a)(e,[{key:"calcularQtdAnos",value:function(e,a){return null!=e&&null!=a?new Date(a).getFullYear()-new Date(e).getFullYear():0}},{key:"calcularJuros",value:function(e,a){return a>0?e*a:0}}],[{key:"Resgate",value:function(a,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3?arguments[3]:void 0;return new e(a,null,n,r.Resgate,t,null,o)}}]),e}()}},[[144,1,2]]]);
//# sourceMappingURL=main.58f8e116.chunk.js.map