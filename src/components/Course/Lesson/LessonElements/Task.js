import React from 'react';
import s from './LessonElements.module.css';
import Cookies from "js-cookie";

import MultiTest from './TaskElements/MultiTest';
import Test from './TaskElements/Test';
import OpenAnswer from './TaskElements/OpenAnswer';

import deleteIcon from '../../../../assets/images/delete.png';

let soloTest = 'Test with one choice';
let multiTest = 'Test with multi choice';
let openAnswer = 'Write answer in textfield';

class Task extends React.Component {
    state = {
        type: '',
        taskMessage: '',
		triedToComplete: false,
		taskCompletedNow: false
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

	toggleTaskCompletedNow = () => {
		this.setState({
			taskCompletedNow: true
		});
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
        let taskCookie = Cookies.get(`task${lessonId}`);
        let taskObject = JSON.parse(taskCookie);

        this.setState({ triedToComplete: true });
        taskObject.attempts--;

        if (taskObject.attempts === 2)
            taskObject.firstTryTime = now - taskObject.startDate;

        if (status) {
            let newObj = {
                attempts: taskObject.attempts,
                first_try_time: taskObject.firstTryTime,
                overall_result: true,
                total_time: now - taskObject.startDate
            }
			if (this.props.userLogged) {
				this.props.completeLesson(this.props.lesson.id, this.props.lesson.type, newObj);
			} 

			this.toggleTaskCompletedNow();
            this.setState({ taskMessage: `You're right!` });
            Cookies.remove(`task${lessonId}`);

        } else if (taskObject.attempts === 0) {
            let newObj = {
                attempts: taskObject.attempts,
                first_try_time: taskObject.firstTryTime,
                overall_result: false,
                total_time: now - taskObject.startDate
			}
			
			if (this.props.userLogged) {
				this.props.completeLesson(this.props.lesson.id, this.props.lesson.type, newObj);
			} 

			this.toggleTaskCompletedNow();
            this.setState({ taskMessage: `Wrong! You have no more attempts :(` });
            Cookies.remove(`task${lessonId}`);
        } else {            
            this.setState({ taskMessage: `Wrong! You have ${taskObject.attempts} more attepmts` });
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
			taskCompletedNow: this.state.taskCompletedNow,

            completeTask: this.completeTask,
            editElement: this.editElement,
            editQuiz: this.editQuiz,
            editQuestion: this.editQuestion,
            addOption: this.addOption,
            deleteOption: this.deleteOption,
            editOption: this.editOption,
        }
        if (this.state.type === openAnswer)
            taskComponent = <OpenAnswer {...this.state} {...propsObj} />
        else if (this.state.type === soloTest)
            taskComponent = <Test {...this.state} {...propsObj} />
        else if (this.state.type === multiTest)
            taskComponent = <MultiTest {...this.state} {...propsObj} />

       
        return (
            this.props.editMode ?
                <div className={s.task}>
                    <div className={s.elementHeader}>
                        <div className="icon delete"><img src={deleteIcon} alt="deleteIcon" onClick={() => { this.deleteElement(this.props.id) }} /></div>
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
                </div>);
    }
}
export default Task;
