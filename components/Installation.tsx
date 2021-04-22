import React, {useState, useEffect} from 'react'
import DraggableList from './DraggableList'
import Tanks from '../components/Tanks'
import Montage from '../components/Montage'
import Buffors from '../components/Buffors'
import Boards from '../components/Bords'
import Headers from '../components/Headers'
import HydraulicElements from '../components/HydraulicElements'
import Pumps from '../components/Pumps'

import {round} from '../utils/round'
import _ from 'lodash'

export default function Installation({data, userData, reset, id}) {

    const [tanks, setTanks] = useState([])
    const [montage, setMontage] = useState([])
    const [buffors, setBuffors] = useState([])
    const [board, setBoard] = useState([])
    const [hydraulicElements, setHydraulicElements] = useState([])
    const [pump, setPump] = useState([])

    return (
        <div className="w-full">
            <div className="w-full">
                <DraggableList data={[pump, tanks, buffors, hydraulicElements, board, montage].flat()} id={id} dane={userData} reset={reset} />
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-1/4 mx-auto flex flex-col space-y-12">
                    <Pumps data={{headers: data.headers, models: data.heatPumps}} reset={reset} passData={(data) => {
                        if(_.isEmpty(data.header) || _.isEmpty(data.model)){
                              setPump([])
                        }
                        else{
                            setPump([{
                                name: data.header.nazwa + " typ: " + data.model.name,
                                price: round((data.model.price * data.model.promotion),10,5)
                              }])
                            }
                        }}/>
                    <Tanks data={data.tanks} passData={setTanks} reset={reset}/>
                </div>
                <div className="w-full lg:w-1/4 mx-auto flex flex-col space-y-12">
                    <Montage data={data.montages} passData={setMontage} reset={reset}/>
                    <Buffors data={data.buffors} passData={setBuffors} reset={reset}/>
                </div>
                <div className="w-full lg:w-1/4 mx-auto flex flex-col space-y-12">
                    <Boards data={data.boards} passData={setBoard} reset={reset}/>
                    <HydraulicElements data={data.hydraulicElements} passData={setHydraulicElements} reset={reset}/>
                </div>
            </div>
        </div>
    )
}
