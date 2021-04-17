import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import UserData from '../components/UserData'
import Tanks from '../components/Tanks'
import Montage from '../components/Montage'
import Buffors from '../components/Buffors'
import Boards from '../components/Bords'
import Headers from '../components/Headers'
import HydraulicElements from '../components/HydraulicElements'

import {saveDocument} from '../utils/saveDocuemnt'

import _ from 'lodash'
import Pumps from '../components/Pumps'
import DraggableList from '../components/DraggableList'

export default function Home(props) {

  const [dane, setDane] = useState({})
  const [tanks, setTanks] = useState([])
  const [montage, setMontage] = useState([])
  const [buffors, setBuffors] = useState([])
  const [board, setBoard] = useState([])
  const [headers, setHeaders] = useState([])
  const [hydraulicElements, setHydraulicElements] = useState([])
  const [pump, setPump] = useState([])
  const [elements, setElements] = useState(null)


  return (
    <div className="w-screen max-w-full min-h-screen bg-warmGray-100">
      <Head>
        <title>Kalkulator Pomp Ciepła</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen">
      <NavBar />
          <section className="max-w-10xl mx-auto ">
              <div className="w-full mx-auto py-6 px-4">

                <UserData passData={setDane}/>

                <div className="w-full my-16">
                  <DraggableList data={[pump, tanks, buffors, hydraulicElements, board, montage].flat()} dane={dane}/>
                </div>

                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="w-full lg:w-1/4 mx-auto flex flex-col space-y-10">
                    <Pumps data={{headers: props.headers, models: props.heatPumps}} passData={(data) => {
                      if(data.header != null && data.model != null){
                        setPump([{
                          name: data.header.nazwa + " typ: " + data.model.name,
                          price: Math.floor(data.model.price * data.model.promotion)
                        }])
                      }
                    }}/>
                    <Tanks data={props.tanks} passData={setTanks}/>
                  </div>
                  <div className="w-full lg:w-1/4 mx-auto flex flex-col space-y-10">
                    <Montage data={props.montages} passData={setMontage} />
                    <Buffors data={props.buffors} passData={setBuffors}/>
                  </div>
                  <div className="w-full lg:w-1/4 mx-auto flex flex-col space-y-10">
                    <Boards data={props.boards} passData={setBoard}/>
                    <HydraulicElements data={props.hydraulicElements} passData={setHydraulicElements}/>
                  </div>
                </div>
              </div> 
          </section>
      </main>
    </div>
  )
}

export async function getStaticProps(context) {

  const {client} = require('../graphql/utils')

  const {heatPumps} = await client.request(`
    query MyQuery {
      heatPumps {
        header {
          nazwa
          id
        }
        pumpModels {
          name
          price
          promotion
          id
        }
        id
      }
    }
  `)

  const {headers} = await client.request(`
    query MyQuery {
      headers {
        nazwa,
        id
      }
    }  
  `)

  const {buffors} = await client.request(`
    query MyQuery {
      buffors {
        name
        price
        promotion
        id
      }
    }
  `)

  const {hydraulicElements} = await client.request(`
    query MyQuery {
      hydraulicElements {
        id
        name
        promotion
        description
      }
    }
  `)

  const {tanks} = await client.request(`
    query MyQuery {
      tanks {
        capacity
        id
        name
        price
        promotion
      }
    }  
  `)

  const {montages} = await client.request(`
    query MyQuery {
      montages {
        id
        name
        price
      }
    }  
  `)

  const {boards} = await client.request(`
    query MyQuery {
      boards {
        id
        name
        price
        promotion
      }
    }
  `)

  return {
    props: {
      headers,
      heatPumps: Object.entries(_.groupBy(heatPumps, 'header.id')).map(h => ({
        id: h[0],
        models: h[1].map(m => m.pumpModels).flat()
      })),
      buffors,
      hydraulicElements,
      tanks,
      montages,
      boards
    },
    revalidate: 1200
  }
}
