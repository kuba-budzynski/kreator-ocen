import React, {useState, useEffect, useRef} from 'react';
import Select from 'react-dropdown-select';
import _ from 'lodash'

const Pumps = ({data, passData, reset}) => {

    const [header, setHeader] = useState({});
    const [model, setModel] = useState({});

    useEffect(() => {
        if(!_.isEmpty(header) && !_.isEmpty(model)) passData({model, header})
    }, [header, model])

    const onHeaderSelect = (values) => {
        setHeader(values[0] ? values[0].value : {})
        if(!values[0]) setModel({})
        if(!_.isEmpty(header) && !_.isEmpty(model)) passData({
            header: data.headers.find(f => f.id == header.id),
            model: data.models.find(f => f.id == header.id).models.find(f => f.id == model)
        })
    }

    const onModelSelect = (values) => {
        setModel(values[0] ? values[0].value : {})
        if(!_.isEmpty(header) && !_.isEmpty(model)) passData({
            header: data.headers.find(f => f.id == header.id),
            model: data.models.find(f => f.id == header.id).models.find(f => f.id == model)
        })
    }

    useEffect(() => {
        setHeader({})
        setModel({})
        passData({model: {}, header: {}})
    }, [reset])

    const options1 = data.headers.map(h => ({
        value: h,
        label: h.nazwa
    }))

    const getOptions = () => {
        if(_.isEmpty(header)) return []
        else return data.models.find(f => f.id == header.id).models.map(m => ({
            value: m,
            label: m.name + " - " + Math.floor(m.price * m.promotion) + " zł"
        }))
    }

    const styles = {
        option: (provided, state) => ({
          ...provided,
          fontWeight: state.isSelected ? "bold" : "normal",
          color: "gray",
          fontSize: state.selectProps.myFontSize
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: "black",
          fontSize: state.selectProps.myFontSize
        })
      };

    return (
        <div className="w-full">
            <h1 className="text-center text-3xl md:text-4xl xl:text-6xl  font-bold text-gray-500 my-2">Pompy</h1>
            <div className="w-full space-y-4">
                <Select
                    reset={reset}
                    required
                    separator
                    clearable
                    values={_.isEmpty(header) ? [] : [header]}
                    placeholder="Nagłówek"
                    options={options1}
                    onChange={(values) => onHeaderSelect(values)}
                    style={{backgroundColor: "white", width: "100%"}}
                />
                <Select
                    reset={reset || _.isEmpty(header)}
                    disabled={_.isEmpty(header)}
                    required
                    separator
                    clearable
                    values={_.isEmpty(model) ? [] : [model]}
                    placeholder="Model"
                    options={getOptions()}
                    onChange={(values) => onModelSelect(values)}
                    style={{backgroundColor: "white", width: "100%"}}
                />
            </div>
        </div>
    );
}

export default Pumps;
