import React from 'react';
import s from './LessonElements.module.css';

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
                        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.deleteElement(this.props.id) }}></i>
                        <i className="fa fa-arrows" aria-hidden="true"></i>
                        <h2>Text</h2>
                    </div>
                    <textarea defaultValue={this.state.text} placeholder={"Write text here"} onChange={this.onTextChange} onBlur={()=>{this.editElement(this.props.id)}}/>
                </div>
                : this.state.text ?
                    <div className={s.text}>
                        <h2> Lecture notes</h2>
                        <p>{this.state.text}</p>
                    </div>
                    : null
        );
    }
}
export default Text;
