import React, {Component, useState } from 'react';
import { DragSource, DropTarget, } from "react-dnd";



const Item = (props) => {
    let Component = {...props.element, props}; 
    return Component;
};

const dragSpec = {
    beginDrag: props => ({
        id: props.id,
        originalIndex: props.find(props.id).index
    }),
    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) return props.move(droppedId, originalIndex);
        return props.change(droppedId, originalIndex);
    }
};
const dragCollect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});
const dropSpec = {
    canDrop: () => false,
    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.find(overId);
            props.move(draggedId, overIndex);
        }
    }
};
const dropCollect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
});

const DndItem = DropTarget("item", dropSpec, dropCollect)(
    DragSource("item", dragSpec, dragCollect)(Item)
);

export default DndItem;