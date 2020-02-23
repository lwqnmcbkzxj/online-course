import React from 'react';
import s from '../LessonElements.module.css';
import { Field, reduxForm } from 'redux-form';

const OpenAnswer = (props) => {
    let editAnswer = (e) => {
        let answers = props.answers;
        answers[0] = e.currentTarget.value;

        props.editQuiz(props.options, answers)
    }

    let completeTask = (formData) => {
        debugger
        if (formData.answer === props.answers[0])
            props.completeTask(+props.lesson.id, true)
        else
            props.completeTask(+props.lesson.id, false)
    }

    return (
        props.editMode ?
            <input defaultValue={props.answers} placeholder={"Enter correct answer here"} onBlur={(e) => { editAnswer(e) }} />
            : <ReduxOpenAnswerForm onSubmit={completeTask} {...props} />

    );
}



const OpenAnswerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="answer" placeholder={"Enter your answer here"} component="input" />
            <div className={s.buttonHolder}>
                {!props.completedLessonsIds.some(id => id === +props.lesson.id) && props.lesson.type === 1 ?
                    <button>Answer</button> : null}
            </div>
        </form>
    );
}
const ReduxOpenAnswerForm = reduxForm({ form: 'openAnswer' })(OpenAnswerForm);



export default OpenAnswer;
