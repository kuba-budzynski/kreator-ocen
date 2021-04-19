import React, {useState, useEffect} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {saveDocument} from '../utils/saveDocuemnt'

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "#22C55E" : "#E7E5E4",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? "#D6D3D1" : "#E7E5E4",
    padding: '1.5rem',
    width: '100%',
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

const DraggableList = ({data, dane}) => {
    
    const [page, setPage] = useState(0)
    const [items, setItems] = useState(data)
    const [value, setValue] = useState(0)
    const [final, setFinal] = useState({})

    useEffect(() => {
        setItems(data);
    }, [data])

    useEffect(() => {
        let i = 1
        setFinal({...dane, netto: Math.ceil(value/100)*100, brutto: Math.ceil((value * 1.08)/100)*100,
            list: {
                id: i++,
                title: 'Pompa ciepła Panasonic',
                elements: items
            }
        })

    }, [dane, items, value])
    

    useEffect(() => {
        setValue(sumAll(items))
    }, [items])


    const sumAll = (items) => {
        let sum = 0;
        if(items.length == 0) return 0;
        else if(items.length == 1) return items[0].price
        else{
            items.forEach(i => sum += i.price)
            return sum;
        }
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
        const newOrder = reorder(
          items,
          result.source.index,
          result.destination.index
        );
    
        setItems(newOrder)
      }

    return (
        <div className="mb-4">
            <div className="text-6xl text-gray-500 font-bold my-4 flex justify-center">
                <span className="mr-5 text-center">Lista elementów</span> 
                </div>
            <div className="w-full">
                <div className="w-full lg:w-2/3 mx-auto px-4 lg:px-0">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            >
                            {items.map((item, index) => (
                                <Draggable key={item.name} draggableId={item.name} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                        className="w-full"
                                        >
                                        <div className="w-full flex flex-col lg:flex-row space-x-0 lg:space-x-4">
                                            <div className="w-full lg:w-10/12 text-gray-400 font-semibold text-lg text-center lg:text-left">
                                                {item.name}
                                            </div>
                                            <div className="w-full lg:w-2/12 text-center text-xl font-bold text-gray-400 lg:border-l-2 lg:border-gray-400 lg:border-dashed lg:my-auto my-4">
                                                {item.price} zł
                                            </div>
                                        </div>
                                    </div>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                        </Droppable>
                    </DragDropContext>
                    <div className="w-full mx-auto">
                        <div className="mx-6 flex justify-end">
                            <p className="text-xl text-gray-500 font-bold mr-3">Wartość zamówienia: </p>
                            <input 
                                className="w-1/2 lg:w-2/12 px-3 py-1 bg-warmGray-200 text-gray-500 text-xl font-bold text-center"
                                placeholder="Wartość"
                                type="number"
                                value={value}
                                onChange={(e) => setValue(parseFloat(e.target.value))}
                            />  
                        </div>                     
                    </div>
                    <div className="w-full mx-auto flex justify-center">
                      <button className="px-12 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-2xl uppercase font-bold mx-auto my-3" onClick={() => {
                        saveDocument(final)
                      }}>Generuj dokument</button>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default DraggableList;
