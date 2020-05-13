import React, { useState,useEffect } from 'react';
import Chart from 'react-google-charts'
import { CircularProgress , Box } from '@material-ui/core'

export default function Graphic ({ativos}) {

  //let cabecario = ["nome","patrimonio"]
  // let dados = []
  // dados.push( cabecario )
  // dados = [...dados , ...ativos.map( ativoItem => ([  ativoItem.nome , ativoItem.patrimonio  ]) )  ] 
  
  let dados = ativos 
  console.log( "dados>" , dados  )
  return ( 
    <Chart 
        component={Box}
        width={"350px"}
        height={"350px"}
        chartType="PieChart"
        data={ dados  }
        loader={<CircularProgress />}
        options={{
          pieStartAngle:90,
          legend:"label"
          // pieHole: 0.1,
          // pieSliceTextStyle:{
          //   color:"#616161"
          // }
        }}
        
      />
  )
}