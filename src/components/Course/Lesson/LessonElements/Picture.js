import React from 'react';
import s from './LessonElements.module.css';

import moveIcon from '../../../../assets/images/move.svg'
import deleteIcon from '../../../../assets/images/delete.png'

class Picture extends React.Component {
    state = {
        media: "",
    }
    componentDidMount(prevProps) {
        if (this.props.media !== null) {
            this.setState({ media: this.props.media });
        }
        else
            this.setState({ media: "" });
    }
    deleteElement = (elementId) => {
        this.props.deleteElement(elementId);
    }

    editElement = (elementId) => {
        this.props.editElement(elementId, this.state.media);
    }

    onTextChange = (e) => {
        this.setState({
            media: e.currentTarget.value
        })
    }

    render() {
        // const { isDragging, connectDragSource, connectDragPreview, connectDropTarget, editMode, find, move, change, ...restProps } = this.props
        // const opacity = isDragging ? 0.5 : 1;

        if (this.props.editMode) {
            return(
            // connectDropTarget(
                // connectDragPreview(
                    <div>
                        <div className={s.elementHeader} >
                            <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { this.deleteElement(this.props.id) }} /></div>
                            {/* {connectDragSource(<div className="icon move"><img src={moveIcon} alt="moveIcon" /></div>)} */}
                            <h2>Picture</h2>
                        </div>
                        <input defaultValue={this.state.media} placeholder={"http://"} onChange={this.onTextChange} onBlur={() => { this.editElement(this.props.id) }} />
                    </div>
                // )
            )
        } else {
            return this.state.media ?
                <div className={s.picture}>
                    <img src={this.state.media} alt="pictureBlockImage" />
                </div>
                : null
        }
    }
}
export default Picture;
