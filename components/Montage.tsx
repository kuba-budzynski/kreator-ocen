import React, {useState, useEffect} from 'react';
import Search from './Search';

const Montage = ({data, passData, reset}) => {

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
        passData(d)
    }, [selected])

    useEffect(() => {
        setSelected(data.map(d => ({
            id: d.id,
            clicked: false
        })))
        setSearch('')
    }, [reset])

    return (
        <div className="w-full">
            <h1 className="text-center text-3xl md:text-4xl xl:text-6xl font-bold text-gray-500 my-2">Montaż</h1>
            <Search search={setSearch}/>
            <div className="w-full mx-auto flex flex-col space-y-6">
                {data.map(d => {
                    if(search == '' || search.split(' ').some(w => d.name.includes(w)) || search.split(' ').some(w => d.price.toString().includes(w))){
                        return (
                            <div className={`cursor-pointer w-full h-full px-4 py-3 rounded-lg ${selected.find(f => f.id == d.id).clicked ? `border-2 border-green-400 shadow-green`: `border-2 border-gray-500`} hover:border-green-400`} id={d.id} onClick={() => onSelect(d)}>
                                <div className="text-lg text-gray-500 font-bold leading-6">{d.name}</div>
                                <div className="w-full text-right text-rose-400 font-bold text-lg lining-nums slashed-zero">{d.price}zł</div>
                            </div>
                        )
                    }
                    return ''
                })}
            </div>
        </div>
    )
}

export default Montage;
