import React from 'react';
import s from './LessonElements.module.css';

class Text extends React.Component {
    state = {
        text: "",
    }
    componentDidUpdate(prevProps) {
        if (this.props.text !== prevProps.text) {
            if (this.props.text !== null)
                this.setState({ text: this.props.text })
            else 
                this.setState({ text: "" })                
        }
    }

    deleteElement = (position) => {
        this.props.deleteElement(position);
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
                    <textarea defaultValue={this.state.text} placeholder={"Write text here"} />
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
