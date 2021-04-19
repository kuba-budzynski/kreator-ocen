import React, {useState, useEffect} from 'react';
import Search from './Search';

const Buffors = ({data, passData}) => {

    const [selected, setSelected] = useState(data.map(d => ({
        id: d.id,
        clicked: false
    })))

    const [search, setSearch] = useState('');

    const onSelect = (d) => {
        const x = selected.find(f => f.id == d.id).clicked;
        setSelected(selected.map(s => {
            if(s.id == d.id) return ({id: s.id, clicked: !x})
            else return s;
        }))
    }

    useEffect(() => {
        const d = selected.filter(f => f.clicked == true).map(s => {
            return data.find(f => f.id == s.id)
        })
        passData(d.map(e => {
            let price = Math.ceil((e.price)/100)*100;
            if(e.promotion) price = Math.ceil((e.price * e.promotion)/100)*100
            return ({
                name: e.name,
                price: price
            })
        }))
    }, [selected])

    return (
        <div className="w-full">
            <h1 className="text-center text-6xl font-bold text-gray-500 my-3">Bufory</h1>
            <Search search={setSearch}/>
            <div className="w-full mx-auto flex flex-col space-y-6">
                {data.map(d => {
                    if(search == '' || d.name.includes(search) || d.price.toString().includes(search) || (d.promotion * 100).toString().includes(search) || Math.floor(d.price * d.promotion).toString().includes(search)){
                        return (
                            <div className={`cursor-pointer w-full h-full px-4 py-3 rounded-lg ${selected.find(f => f.id == d.id).clicked ? `border-2 border-green-400 shadow-green`: `border-2 border-gray-500`} hover:border-green-400`} id={d.id} onClick={() => onSelect(d)}>
                                <div className="text-lg text-gray-500 font-bold leading-6">{d.name}</div>
                                <div className="w-full text-sm text-gray-400 mt-1">
                                    <p className="text-right">{d.promotion != 1 ? `${d.price}zł * ${d.promotion * 100}% = `: ''}  
                                    <span className="text-rose-400 font-bold text-lg lining-nums slashed-zero ml-1">{Math.floor(d.price * d.promotion)}zł</span>
                                    </p>
                                </div>
                            </div>
                        )
                    }
                    return ''
                })}
            </div>
        </div>
    );
}

export default Buffors;
