import React from 'react';
import s from './LessonElements.module.css';
import Cookies from "js-cookie";

import MultiTest from './TaskElements/MultiTest';
import Test from './TaskElements/Test';
import OpenAnswer from './TaskElements/OpenAnswer';

let soloTest = 'Test with one choice';
let multiTest = 'Test with multi choice';
let openAnswer = 'Write answer in textfield';
class Task extends React.Component {
    state = {
        type: '',
        taskMessage: '',
        completeTry: false,
    }
    componentDidMount() {
        this.setCurrentState();
        if (!this.props.editMode) {
            this.createTaskCookie();
        }
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
        debugger
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


    createTaskCookie = () => {
        let lessonId = +this.props.lesson.id;
        if (!this.props.completedLessonsIds.some(id => id === lessonId) && !Cookies.get(`task${lessonId}`)) {
            let taskDataObject = {
                id: lessonId,
                startDate: Date.now(),
                totalTime: 0,
                firstTryTime: 0,
                attempts: 3,
                overAllResult: false,
            }

            Cookies.set(`task${lessonId}`, JSON.stringify(taskDataObject), { expires: 7 });
        }
    }

    completeTask = (lessonId, status) => {
        let now = Date.now();
        let a = Cookies.get(`task${lessonId}`);
        let taskObject = JSON.parse(a);

        this.setState({completeTry:true});
        taskObject.attempts--;
       
        if (taskObject.attempts === 2)
            taskObject.firstTryTime = now - taskObject.startDate;

        if (status) {
            let newObj = {
                id: taskObject.id,
                firstTryTime: taskObject.firstTryTime,
                overAllResult: true,
                totalTime: now - taskObject.startDate
            }
            this.setState({ taskMessage: `Correct answer. You completed task in ${3 - taskObject.attempts} attempts` });

            this.props.completeLesson(this.props.lesson.id, this.props.lesson.type, JSON.stringify(newObj) )
            Cookies.remove(`task${lessonId}`);
        } else if (taskObject.attempts === 0) {
            let newObj = {
                id: taskObject.id,
                firstTryTime: taskObject.firstTryTime,
                overAllResult: false,
                totalTime: now - taskObject.startDate
            }
            Cookies.remove(`task${lessonId}`);            
            this.setState({ taskMessage: `Incorrect answer. You got ${taskObject.attempts} attempts` });

            this.props.completeLesson(this.props.lesson.id, this.props.lesson.type, JSON.stringify(newObj) )            
        } else {
            this.setState({ taskMessage: `Incorrect answer. You got ${taskObject.attempts} attempts` });
            Cookies.set(`task${lessonId}`, JSON.stringify(taskObject), { expires: 7 });
        }
    }
    render() {
        let taskComponent = null;
        let propsObj = {
            editMode: this.props.editMode,
            lesson: this.props.lesson,
            id: this.props.id,
            completedLessonsIds: this.props.completedLessonsIds,

            completeTask: this.completeTask,
            editElement: this.editElement,
            editQuiz: this.editQuiz,
            editQuestion: this.editQuestion,
            addOption: this.addOption,
            deleteOption: this.deleteOption,
            editOption: this.editOption,
            editAnswer: this.editAnswer,
        }
        if (this.state.type === openAnswer)
            taskComponent = <OpenAnswer {...this.state} {...propsObj} />
        else if (this.state.type === soloTest)
            taskComponent = <Test {...this.state} {...propsObj} />
        else if (this.state.type === multiTest)
            taskComponent = <MultiTest {...this.state} {...propsObj} />

        return (
            this.props.editMode ?
                <div>
                    <div className={s.elementHeader}>
                        <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.deleteElement(this.props.id) }}></i>
                        <i className="fa fa-arrows" aria-hidden="true"></i>
                        <h2>Task - {this.state.type}</h2>
                    </div>
                    <input defaultValue={this.props.text} placeholder="Enter task question here" onBlur={(e) => { this.editQuestion(e) }} />
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
                    {this.state.completeTry && <p>{this.state.taskMessage}</p>}
                    
                </div>

        );
    }
}
export default Task;
