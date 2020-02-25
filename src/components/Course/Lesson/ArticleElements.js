import React, { useState, Component } from 'react';
import s from './Lesson.module.css';
import { DndProvider } from "react-dnd";

import { DragSource, DropTarget, DragDropContext, connectDropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import DndItem from './Element';

export const withDragDropContext = (Component) => {
    return (props) => (
        <DndProvider backend={HTML5Backend}>
            <Component {...props} />
        </DndProvider>
    );
};


const ArticleElements = (props) => {
    
    const [list = [], setList] = useState(props.articleElements);
    React.useEffect(() => {
        setList(props.articleElements);
    }, [props.articleElements])


    list.map(element => { 
        if (!element) {
            setList([]);
        }
    })

    const onDropEnd = (list, fromIndex, toIndex) => {
        setList([...list]);
        console.log(fromIndex + '-' + toIndex)
    };

    const find = id => {
        const item = list.find(elem => elem.props.id === id);
        return {
            item,
            index: list.indexOf(item)
        };
    };
    const move = (id, toIndex) => {
        const { item, index } = find(id);
        list.splice(index, 1);
        list.splice(toIndex, 0, item);
        setList([...list]);
    };
    const change = (id, fromIndex) => {
        const { index: toIndex } = find(id);
        onDropEnd(list, fromIndex, toIndex);
    };


    return (
        list.length ?
            <div className={s.articleBlock}>
                <h2>Lecture notes</h2>
                {list.map(element =>
                    <div className={s.lessonElement} key={`answer-${element.props.id}`}>                        
                        <DndItem element={element} {...element.props} move={move} change={change} find={find} editMode={true}/>
                    </div>)}

            </div>
            : null
    )
}
const DndList = DropTarget("item", {}, connect => ({
    connectDropTarget: connect.dropTarget()
}))(ArticleElements);

export default withDragDropContext(DndList);

