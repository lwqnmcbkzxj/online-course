import React from 'react';
import s from './LessonElements.module.css';

class Task extends React.Component {
    state = {
        type: '',

    }
    componentDidMount() {
        debugger
        let options = this.props.json_quiz_option;       
        let answers = this.props.json_quiz_answers;

        if (options)
            options = JSON.parse(this.props.json_quiz_options);
        
        if (answers)
            answers = JSON.parse(this.props.json_quiz_answers);       
        

        if (options === null)
            this.setState({ "type": "openAnswer" })
        else if (answers.length === 1)
            this.setState({ "type": "test" })
        else if (answers.length > 1)
            this.setState({ "type": "multiTest" });
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
        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.deleteElement(this.props.id) }}></i>
                        <i className="fa fa-arrows" aria-hidden="true"></i>
                        <h2>Task</h2>
                        {this.state.type}
                    </div>
                </div>
                :
                <div className={s.task}>
                    {this.state.type}

                </div>

        );
    }
}
export default Task;

const Test = (props) => {
    return (
        <div className={s.lesson}>
            
        </div>
    );
}
const MultiTest = (props) => {
    return (
        <div className={s.lesson}>
            
        </div>
    );
}
const OpenAnswer = (props) => {
    return (
        <div className={s.lesson}>
            
        </div>
    );
}
