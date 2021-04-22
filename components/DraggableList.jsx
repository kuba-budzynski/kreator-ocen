import React, {useState, useEffect, useContext} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from 'lodash'
import {round} from '../utils/round'
import store from '../store/index'
import {addOffer} from '../store/actions/index'

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "#22C55E" : "#E7E5E4",
    ...draggableStyle
  });
  
  const getListStyle = isDraggingOver => ({
    padding: '1.5rem',
    width: '100%',
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

const DraggableList = ({data, dane, reset, id}) => {
    
    const [title, setTitle] = useState("Pompa ciepła Panasonic")
    const [items, setItems] = useState(data)
    const [value, setValue] = useState(0)

    useEffect(() => {
        setItems(data);
    }, [data])

    useEffect(() => {
        store.dispatch(addOffer({
            id,
            list: {
                id: id,
                title: title,
                netto: round(value, 10, 5),
                brutto: round(value * 1.08, 10,5),
                elements: items
            }
        }))
    }, [items, value])

    useEffect(() => {
        setValue(val => sumAll(items))
    }, [items])

    useEffect(() => {
        store.dispatch(addOffer({
            id,
            list: {}
        }))
        setTitle("Pompa ciepła Panasonic")
    }, [reset])


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
        <div className="mb-4 w-full">
            <div className="w-full text-3xl md:text-4xl lg:text-6xl text-gray-500 font-bold my-4 flex justify-center">
                <span className="text-center">Lista elementów</span> 
            </div>
            <div className="w-full">
                <div className="w-full lg:w-2/3 mx-auto px-4 lg:px-0">
                    <div className="w-full mx-auto max-w-4xl flex justify-center">
                        <input 
                            type="text" 
                            placeholder="Tytuł" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value) }
                            className="w-full lg:w-1/2 px-5 py-1 mb-8 bg-warmGray-200 text-gray-500 text-lg text-left"
                         />
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={`droppable${id}`}>
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
                        <div className="mx-2 lg:mx-6 flex justify-end">
                            <p className="text-lg lg:text-xl text-gray-500 font-bold mr-3">Wartość zamówienia: </p>
                            <input 
                                className="w-1/2 lg:w-2/12 px-3 py-1 bg-warmGray-200 text-gray-500 text-xl font-bold text-center"
                                placeholder="Wartość"
                                type="number"
                                value={value}
                                onChange={(e) => setValue(parseFloat(e.target.value))}
                            />  
                        </div>                     
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DraggableList;
