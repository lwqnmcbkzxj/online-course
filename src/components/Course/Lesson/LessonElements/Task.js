import React from 'react';
import s from './LessonElements.module.css';
let soloTest = 'Test with one choise';
let multiTest = 'Test with multi choise';
let openAnswer = 'Write answer in textfield';
class Task extends React.Component {
    state = {
        type: '',
    }
    componentDidMount() {
        this.setCurrentState();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setCurrentState();
        }
    }

    setCurrentState() {
        let options = this.props.json_quiz_options;
            let answers = this.props.json_quiz_answers;

            if (options) options = JSON.parse(options);
            if (answers) answers = JSON.parse(answers);

            if (options.length === 1)
                this.setState({ "type": openAnswer, answers: answers })
            else if (answers.length === 1)
                this.setState({ "type": soloTest, options, answers: answers })
            else if (answers.length > 1)
                this.setState({ "type": multiTest, options, answers });
    } 

    deleteElement = (elementId) => {
        this.props.deleteElement(elementId);
    }

    editElement = (data) => {
        this.props.editElement(this.props.id, data, 3);
    }

    render() {
        let taskComponent = null;
        if (this.state.type === openAnswer)
            taskComponent = <OpenAnswer editMode={this.props.editMode} {...this.state} editElement={this.editElement} />
        else if (this.state.type === soloTest)
            taskComponent = <Test editMode={this.props.editMode} {...this.state} id={this.props.id} editElement={this.editElement} />
        else if (this.state.type === multiTest)
            taskComponent = <MultiTest editMode={this.props.editMode} {...this.state} id={this.props.id} editElement={this.editElement} />

        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.deleteElement(this.props.id) }}></i>
                        <i className="fa fa-arrows" aria-hidden="true"></i>
                        <h2>Task - {this.state.type}</h2>
                    </div>
                    <input defaultValue={this.props.text} placeholder="Enter task question here" />
                    {taskComponent}
                </div> :
                <div className={s.task}>
                    <h2>Task - {this.state.type}</h2>
                    <h3>{this.props.text}</h3>
                    {taskComponent}
                    <div className={s.buttonHolder}><button>Answer</button></div>
                </div>

        );
    }
}
export default Task;

const Test = (props) => {
    let addOption = () => {
        let answers = props.answers;
        let options = [...props.options, ''];
        
        options = JSON.stringify(options);
        answers = JSON.stringify(answers);

        let data = [options, answers];
        props.editElement(data);
    }

    let deleteOption = (position) => {
        let answers = props.answers;
        let options = [...props.options];
        options = props.options.filter((option, counter) => counter !== position)
        
        options = JSON.stringify(options);
        answers = JSON.stringify(answers);

        let data = [options, answers];
        props.editElement(data);
    }

    return (
        props.editMode ?
            <div>
                <form >
                    {props.options.map((option, counter) =>
                        <div className={s.testOption}>
                            <input defaultValue={option} placeholder="Enter option here" />
                            <input name="test" type="radio" value={option} />
                            {props.options.length > 2 ? <i class="fa fa-times" aria-hidden="true" onClick={()=>{deleteOption(counter)}}></i> : null}
                        </div>
                    )}
                </form>
                <button onClick={addOption}>+ Add option</button>
            </div> :
            <div>

                <div className={s.quiz}>
                    {props.options.map((option, counter) =>
                        <div className={s.testButton}>
                            <input type="radio" id={`c${props.id}.${counter}`} value={option} name={`test${props.id}`} />
                            <label htmlFor={`c${props.id}.${counter}`}>Option</label>
                        </div>
                    )}
                </div>
            </div>
    );
}
const MultiTest = (props) => {
    let addOption = () => {
        let answers = props.answers;
        let options = [...props.options, ''];

        options = JSON.stringify(options);
        answers = JSON.stringify(answers);

        debugger
        let data = [options, answers];
        props.editElement(data);
    }
    let deleteOption = (position) => {
        debugger

        let answers = props.answers;
        let options = [...props.options];
        options = props.options.filter((option, counter) => counter !== position)
        
        options = JSON.stringify(options);
        answers = JSON.stringify(answers);

        let data = [options, answers];
        props.editElement(data);
    }

    return (
        props.editMode ?
            <div>
                <form >
                    {props.options.map((option,counter) =>
                        <div className={s.testOption}>
                            <input defaultValue={option} placeholder="Enter option here" />
                            <input type="checkbox" value={option} />
                            {props.options.length > 2 ? <i class="fa fa-times" aria-hidden="true" onClick={()=>{deleteOption(counter)}}></i> : null}
                        </div>
                    )}
                </form>
                <button onClick={addOption}>+ Add option</button>

            </div> :
            <div className={s.quiz}>
                {props.options.map((option, counter) =>
                    <div className={s.testButton}>
                        <input type="checkbox" id={`c${props.id}.${counter}`} value={option} />
                        <label htmlFor={`c${props.id}.${counter}`}>Option</label>
                    </div>
                )}
            </div>

    );
}
const OpenAnswer = (props) => {
    let editElement = (e) => {
        props.editElement()
    }

    return (
        props.editMode ?
            <input defaultValue={props.answers} placeholder={"Enter correct answer here"} onBlur={(e) => { editElement(e) }} />
            : <input placeholder={"Enter your answer here"} />
    );
}
