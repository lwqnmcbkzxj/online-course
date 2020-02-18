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

        debugger
        if (options) options = JSON.parse(options);
        if (answers) answers = JSON.parse(answers);

        if (options.length === 1)
            this.setState({ "type": openAnswer, options, answers })
        else if (answers.length === 1)
            this.setState({ "type": soloTest, options, answers })
        else if (answers.length > 1)
            this.setState({ "type": multiTest, options, answers });
    }

    deleteElement = (elementId) => {
        this.props.deleteElement(elementId);
    }

    editElement = (data) => {
        this.props.editElement(this.props.id, data, 3);
    }

    editQuestion = (e) => {
        this.props.editElement(this.props.id, e.currentTarget.value, 0);
    }

    addOption = () => {
        let answers = this.state.answers;
        let options = [...this.state.options, ''];

        this.editQuiz(options, answers);
    }
    deleteOption = (position) => {
        let answers = [...this.state.answers];
        let options = [...this.state.options];
        options = this.state.options.filter((option, counter) => counter !== position);
        answers = this.state.answers.filter((answer, counter) => answer !== position);

        this.editQuiz(options, answers);
    }
    editOption = (value, position) => {
        let answers = this.state.answers;
        let options = this.state.options;

        options[position] = value;
        this.editQuiz(options, answers);
    }

    editAnswer = (e, position) => {       
        let options = this.state.options;
        let answers = this.state.answers;

        if (e.currentTarget.checked) 
            answers[position] = position.toString();
        else 
            answers[position] = "";            
        
        this.editQuiz(options, answers); 
    }

    editQuiz = (options, answers) => {
        options = JSON.stringify(options);
        answers = JSON.stringify(answers);

        let data = [options, answers];
        this.editElement(data);
    }
   
    render() {
        let taskComponent = null;
        if (this.state.type === openAnswer)
            taskComponent = <OpenAnswer editMode={this.props.editMode} {...this.state} editElement={this.editElement}
                editQuiz={this.editQuiz} editQuestion={this.editQuestion}/>
        else if (this.state.type === soloTest)
            taskComponent = <Test editMode={this.props.editMode} {...this.state} id={this.props.id}
                addOption={this.addOption} deleteOption={this.deleteOption} editOption={this.editOption} editAnswer={this.editAnswer}/>
        else if (this.state.type === multiTest)
            taskComponent = <MultiTest editMode={this.props.editMode} {...this.state} id={this.props.id}
                addOption={this.addOption} deleteOption={this.deleteOption} editOption={this.editOption} editAnswer={this.editAnswer}/>

        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.deleteElement(this.props.id) }}></i>
                        <i className="fa fa-arrows" aria-hidden="true"></i>
                        <h2>Task - {this.state.type}</h2>
                    </div>
                    <input defaultValue={this.props.text} placeholder="Enter task question here" onBlur={(e)=> {this.editQuestion(e)}}/>
                    <div key={this.props.id}>
                        {taskComponent}
                    </div>
                </div> :
                <div className={s.task}>
                    <h2>Task - {this.state.type}</h2>
                    <h3>{this.props.text}</h3>
                    <div key={this.props.id}>
                        {taskComponent}
                    </div>
                    <div className={s.buttonHolder}><button>Answer</button></div>
                </div>

        );
    }
}
export default Task;

class Test extends React.Component {
    state = {
        editMode: ''
    }
    componentDidMount() {
        this.setState({ editMode: this.props.editMode })
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps)
            this.setState({ editMode: this.props.editMode })
    }
    
    addOption = () => {
        this.props.addOption();
    }

    deleteOption = (position) => {
        this.props.deleteOption(position);
        this.setState({ editMode: !this.state.editMode });
        this.setState({ editMode: !this.state.editMode });
    }

    editOption = (e, position) => {
        this.props.editOption(e.currentTarget.value, position)
    }
    editAnswer = (e) => {       
        this.props.editAnswer(e, 0);        
    }
    
    render() {
        debugger
        return (
            this.state.editMode ?
                <div>
                    <form >
                        {this.props.options.map((option, counter) =>
                            <div className={s.testOption} key = {`c${this.props.id}.${counter}1`}>
                                <input defaultValue={option} placeholder="Enter option here" onBlur={(e) => this.editOption(e, counter)} />
                                <input name="test" type="radio" value={option} onChange={(e) => this.editAnswer(e, counter)} checked={this.props.answers.some(element => element == counter)}/>
                                {this.props.options.length > 2 ? <i className="fa fa-times" aria-hidden="true" onClick={() => { this.deleteOption(counter) }}></i> : null}
                            </div>
                        )}
                    </form>
                    <button onClick={this.addOption}>+ Add option</button>
                </div> :
                <div>

                    <div className={s.quiz}>
                        {this.props.options.map((option, counter) =>
                            <div className={s.testButton} key={`c${this.props.id}.${counter}2`}>
                                <input type="radio" id={`c${this.props.id}.${counter}`} value={option} name={`test${this.props.id}`} />
                                <label htmlFor={`c${this.props.id}.${counter}`}>{option ? option : "Option"}</label>
                            </div>
                        )}
                    </div>
                </div>
        );
    }
}
class MultiTest extends React.Component {
    state = {
        editMode: ''
    }
    componentDidMount() {
        this.setState({ editMode: this.props.editMode })
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps)
            this.setState({ editMode: this.props.editMode })
    }

    addOption = () => {
        this.props.addOption();
    }

    deleteOption = (position) => {
        this.props.deleteOption(position);
        this.setState({ editMode: !this.state.editMode });
        this.setState({ editMode: !this.state.editMode });
    }

    editOption = (e, position) => {
        this.props.editOption(e.currentTarget.value, position)
    }

    editAnswer = (e, position) => {       
        this.props.editAnswer(e, position);        
    }

    render() {
        return (
            this.state.editMode ?
                <div>
                    <form >
                        {this.props.options.map((option, counter) =>
                            <div className={s.testOption} key = {`c${this.props.id}.${counter}1`}>
                                <input defaultValue={option} placeholder="Enter option here" onBlur={(e) => this.editOption(e, counter)}/>
                                <input type="checkbox" value={option} onChange={(e) =>this.editAnswer(e, counter)} checked={this.props.answers.some(element => element == counter)}/>
                                {this.props.options.length > 2 ? <i className="fa fa-times" aria-hidden="true" onClick={() => { this.deleteOption(counter) }}></i> : null}
                            </div>
                        )}
                    </form>
                    <button onClick={this.addOption}>+ Add option</button>
    
                </div> :
                <div className={s.quiz}>
                    {this.props.options.map((option, counter) =>
                        <div className={s.testButton} key = {`c${this.props.id}.${counter}2`}>
                            <input type="checkbox" id={`c${this.props.id}.${counter}`} value={option} />
                            <label htmlFor={`c${this.props.id}.${counter}`}>{option ? option : "Option"}</label>
                        </div>
                    )}
                </div>
    
        );
    }
}
const OpenAnswer = (props) => {
    let editAnswer = (e) => {
        let answers = props.answers;
        answers[0] = e.currentTarget.value;

        props.editQuiz(props.options, answers)
    }   

    return (
        props.editMode ?
            <input defaultValue={props.answers} placeholder={"Enter correct answer here"} onBlur={(e) => { editAnswer(e) }} />
            : <input placeholder={"Enter your answer here"} />
    );
}
