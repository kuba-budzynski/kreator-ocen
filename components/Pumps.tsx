import React, {useState, useEffect} from 'react';
import Select from 'react-dropdown-select';

const Pumps = ({data, passData}) => {

    const [header, setHeader] = useState(null);
    const [model, setModel] = useState(null);

    useEffect(() => {
        passData({model, header})
    }, [header, model])

    const onHeaderSelect = (values) => {

        setHeader(values[0] ? values[0].value : null)
        if(header != null && model != null) passData({
            header: data.headers.find(f => f.id == header.id),
            model: data.models.find(f => f.id == header.id).models.find(f => f.id == model)
        })
    }

    const onModelSelect = (values) => {
        setModel(values[0] ? values[0].value : null)
        if(header != null && model != null) passData({
            header: data.headers.find(f => f.id == header.id),
            model: data.models.find(f => f.id == header.id).models.find(f => f.id == model)
        })
    }

    const options1 = data.headers.map(h => ({
        value: h,
        label: h.nazwa
    }))

    const getOptions = () => {
        if(header == null) return []
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
            <h1 className="text-center text-6xl font-bold text-gray-500 my-5">Pompy</h1>
            <div className="w-full space-y-4">
                <Select
                    required
                    separator
                    clearable
                    values={[]}
                    placeholder="Nagłówek"
                    options={options1}
                    onChange={(values) => onHeaderSelect(values)}
                    style={{backgroundColor: "white", width: "100%"}}
                />
                <Select
                    disabled={header == null}
                    required
                    separator
                    clearable
                    values={[]}
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
