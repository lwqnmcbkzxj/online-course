import React from 'react';
import s from './LessonElements.module.css';

import deleteIcon from '../../../../assets/images/delete.png'

class Text extends React.Component {
    state = {
        text: "",
    }
    componentDidMount() {
        if (this.props.text !== null)
            this.setState({ text: this.props.text })
        else
            this.setState({ text: "" })
    }
   
    deleteElement = (elementId) => {
        this.props.deleteElement(elementId);
    }

    editElement = (elementId) => {
        if (this.state.text !== this.props.text)
            this.props.editElement(elementId, this.state.text, this.props.type);
    }

    onTextChange = (e) => {
        let text = e.currentTarget.value;
        if (text.length < 4000)
            this.setState({ text })
    }

    render() {
        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { this.deleteElement(this.props.id) }} /></div>
                        <div>
                            <i className="fa fa-caret-up" aria-hidden="true" onClick={()=>{this.props.changeElementPosition(this.props.id, this.props.is_answer, 0)}}></i>
                            <i className="fa fa-caret-down" aria-hidden="true" onClick={()=>{this.props.changeElementPosition(this.props.id, this.props.is_answer, 1)}}></i>
                        </div>
                        <h2>Text</h2>
                    </div>
                    <textarea value={this.state.text} placeholder={"Write text here (Max. 4000 symbols)"} onChange={this.onTextChange} onBlur={() => { this.editElement(this.props.id) }} />
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
