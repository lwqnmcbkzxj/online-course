import React from 'react';
import s from './LessonElements.module.css';

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
        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { this.deleteElement(this.props.id) }} /></div>
                        <div>
                            <i className="fa fa-caret-up" aria-hidden="true" onClick={()=>{this.props.changeElementPosition(this.props.lesson_position, this.props.is_answer, 0)}}></i>
                            <i className="fa fa-caret-down" aria-hidden="true" onClick={()=>{this.props.changeElementPosition(this.props.lesson_position, this.props.is_answer, 1)}}></i>
                        </div>
                        <h2>Text</h2>
                    </div>
                    <textarea defaultValue={this.state.text} placeholder={"Write text here"} onChange={this.onTextChange} onBlur={() => { this.editElement(this.props.id) }} />
                </div>
                : this.state.text ?
                    <div className={s.text}>
                        <p>{this.state.text}</p>
                    </div>
                    : null
        )
    }
}


export default Text;
