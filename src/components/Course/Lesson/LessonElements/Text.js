import React from 'react';
import s from './LessonElements.module.css';
import { DragSource, DropTarget, } from "react-dnd";

import moveIcon from '../../../../assets/images/move.svg'
import deleteIcon from '../../../../assets/images/delete.png'

class Text extends React.Component {
    state = {
        text: "",
    }
    componentDidMount(prevProps) {
        if (this.props.text !== null)
            this.setState({ text: this.props.text })
        else
            this.setState({ text: "" })
    }

    deleteElement = (elementId) => {
        this.props.deleteElement(elementId);
    }

    editElement = (elementId) => {
        this.props.editElement(elementId, this.state.text, this.props.type);
    }

    onTextChange = (e) => {
        this.setState({
            text: e.currentTarget.value
        })
    }

    render() {
        // const { isDragging, connectDragSource, connectDragPreview, connectDropTarget, editMode, find, move, change, ...restProps } = this.props
        // const opacity = isDragging ? 0.5 : 1;

        if (this.props.editMode) {
            return (
            // connectDropTarget(
                // connectDragPreview(
                    <div>
                        <div className={s.elementHeader} >
                            <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { this.deleteElement(this.props.id) }} /></div>
                            {/* {connectDragSource(<div className="icon move"><img src={moveIcon} alt="moveIcon" /></div>)} */}
                            <h2>Text</h2> 
                        
                        </div>
                        <textarea defaultValue={this.state.text} placeholder={"Write text here"} onChange={this.onTextChange} onBlur={() => { this.editElement(this.props.id) }} />
                    </div>
                // )                
            )
        } else {
            return this.state.text ?
                <div className={s.text}>
                    <p>{this.state.text}</p>
                </div>
                : null
        }        
    }
}


// const dragSpec = {
//     beginDrag: props => ({
//         id: props.id,
//         originalIndex: props.find(props.id).index
//     }),
//     endDrag(props, monitor) {
//         const { id: droppedId, originalIndex } = monitor.getItem();
//         const didDrop = monitor.didDrop();
//         if (!didDrop) return props.move(droppedId, originalIndex);
//         return props.change(droppedId, originalIndex);
//     }
// };
// const dragCollect = (connect, monitor) => ({
//     connectDragSource: connect.dragSource(),
//     connectDragPreview: connect.dragPreview(),
//     isDragging: monitor.isDragging()
// });
// const dropSpec = {
//     canDrop: () => false,
//     hover(props, monitor) {
//         const { id: draggedId } = monitor.getItem();
//         const { id: overId } = props;

//         if (draggedId !== overId) {
//             const { index: overIndex } = props.find(overId);
//             props.move(draggedId, overIndex);
//         }
//     }
// };
// const dropCollect = (connect, monitor) => ({
//     connectDropTarget: connect.dropTarget()
// });

// const Text1 = DropTarget("item", dropSpec, dropCollect)(
//     DragSource("item", dragSpec, dragCollect)(Text)
// );

// export default Text1;
export default Text;
