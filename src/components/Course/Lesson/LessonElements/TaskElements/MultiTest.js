import React from 'react';
import s from '../LessonElements.module.css';
import { Field, reduxForm } from 'redux-form';

class MultiTest extends React.Component {
    state = {
        editMode: '',
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
        let answers = this.props.answers;
        if (e.currentTarget.checked)
            answers[position] = position.toString();
        else
            answers[position] = "";

        this.props.editQuiz(this.props.options, answers);
    }

    completeTask = (formData) => {
        let answers = this.props.answers;
        let correct = false;
        let userDataKeys = [];
        for (let key in formData) {
            if (formData[key]) {
                userDataKeys.push(key.slice(3));
            }
        }
        for (let i = 0; i < answers.length; i++) {
            if (answers[i]) {
                if (userDataKeys.some(userAnswer => userAnswer === answers[i]))
                    correct = true;
                else {
                    correct = false;
                    break;
                }
            }
        }
        if (correct)
            this.props.completeTask(+this.props.lesson.id, true)
        else
            this.props.completeTask(+this.props.lesson.id, false)
    }
    render() {
        return (
            this.state.editMode ?
                <div>
                    <form >
                        {this.props.options.map((option, counter) =>
                            <div className={s.testOption} key={`c${this.props.id}.${counter}1`}>
                                <input defaultValue={option} placeholder="Enter option here" onBlur={(e) => this.editOption(e, counter)} />
                                <input type="checkbox" value={option}
                                    onChange={(e) => this.editAnswer(e, counter)} checked={this.props.answers.some(element => element === counter.toString())} />
                                {this.props.options.length > 2 ? <i className="fa fa-times" aria-hidden="true" onClick={() => { this.deleteOption(counter) }}></i> : null}
                            </div>
                        )}
                    </form>
                    {this.props.options.length <= 8 ? <button onClick={this.addOption}>+ Add option</button> : null}

                </div> :
                <ReduxMultiTestForm onSubmit={this.completeTask} {...this.props} />
        );
    }
}



const MultiTestForm = (props) => {
    debugger
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.quiz}>
                {props.options.map((option, counter) =>
                    <div className={s.testButton} key={`c${props.id}.${counter}2`}>
                        <Field name={`opt${counter}`} id={`c${props.id}.${counter}`} component="input" type="checkbox" />
                        <label htmlFor={`c${props.id}.${counter}`}
                            className={props.completedLessonsIds.some(id => id === +props.lesson.id) ? (
                                props.answers.some(answer => +answer === counter && answer !== "")
                                    ? s.completedTaskcorrectButton : s.completedTaskWrongButton)
                                : null}
                        >


                            {option ? option : "Option"}
                        </label>
                    </div>
                )}
            </div>
            {props.triedToComplete && <p>{props.taskMessage}</p>}
            <div className={s.buttonHolder}>
                {!props.completedLessonsIds.some(id => id === +props.lesson.id) && props.lesson.type === 1 ?
                    <button>Submit</button> : null}
            </div>
        </form>
    );
}
const ReduxMultiTestForm = reduxForm({ form: 'multiTestAnswer' })(MultiTestForm);


export default MultiTest;
