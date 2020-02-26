import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'
import Task from './LessonElements/Task'


class LessonEdit extends React.Component {
    state = {
        taskCount: 0,
        answerElements: [],
        articleElements: [],
    }

    componentDidMount() {
        this.setLessonBlock(true);
        this.setLessonBlock(false);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps || this.props.editMode !== prevProps.editMode) {
            this.setLessonBlock(true);
            this.setLessonBlock(false);
        }
    }
    addTaskElement = (taskType) => {
        let options = null;
        let answers = null;
        if (taskType === 1) {
            answers = [''];
            options = ['', ''];
        } else if (taskType === 2) {
            answers = ['', ''];
            options = ['', ''];
        } else if (taskType === 3) {
            answers = [''];
            options = [''];
        }

        if (answers !== null)
            answers = JSON.stringify(answers)

        if (options !== null)
            options = JSON.stringify(options)

        this.props.addTaskElement(this.props.lesson.id, 3, [options, answers]);
    }

    addElement = (elementType, isAnswer = false) => {
        this.props.addElement(this.props.lesson.id, elementType, this.props.lesson.type, isAnswer);
    }

    deleteElement = (elementId) => {
        this.props.setModalFunction(this.props.deleteElement, [elementId, this.props.lesson.type], 'Element');
    }

    editElement = (elementId, data, elementType) => {
        this.props.editElement(elementId, data, elementType, this.props.lesson.type)
    }

    editLesson = (e) => {
        this.props.editLesson(this.props.currentSectionId, this.props.lesson.id, e.currentTarget.value)
    }

    editSection = (e) => {
        this.props.editSection(this.props.currentSectionId, e.currentTarget.value)
    }

    togglePublish = (type) => {
        this.props.togglePublish(this.props.lesson.id, this.props.currentSectionId, type)
    }

    setLessonBlock = (isAnswer) => {
        let answerElements = [];
        let articleElements = [];
        let taskElement = "";
        if (this.props.lesson.elements) {
            this.props.lesson.elements.map(element => {

                let propsObj = {
                    ...element,
                    editMode: this.props.editMode,
                    deleteElement: this.deleteElement,
                    editElement: this.editElement,
                    changeElementPosition: this.changeElementPosition
                }
                let component = '';
                if (element.type === 0)
                    component = <Text {...propsObj} />;
                else if (element.type === 1)
                    component = <Picture {...propsObj} />;
                else if (element.type === 2)
                    component = <Video {...propsObj} />;
                else if (element.type === 3) {
                    taskElement =
                        <div className={s.lessonElement} key={`task-${element.id}`}>
                            <Task  {...propsObj}
                                lesson={this.props.lesson}
                                completedLessonsIds={this.props.completedLessonsIds}
                                completeLesson={this.completeLesson}
                                showAnswerBlock={this.showAnswerBlock} 
                                />
                        </div>
                }

                if (component) {
                    if (element.is_answer)
                        answerElements.push(<div className={s.lessonElement} key={`answer-${element.id}`}>{component}</div>);
                    else
                        articleElements.push(<div className={s.lessonElement} key={`article-${element.id}`}>{component}</div>);
                }
            })

            this.setState({ taskElement });                

            if (taskElement)
                this.setState({ taskCount: 1 });
            else {
                this.setState({ taskCount: 0 });
            }

            if (isAnswer)
                this.setState({ answerElements });
            else
                this.setState({ articleElements });
        }
    }
    changeElementPosition = (elementPosition, isAnswer, direction) => {  
        let elements = this.props.lesson.elements;
        
        let newPos = 0;
        //Fining closest is_answer equal element
        if (direction === 0 && elementPosition > 1) {
            for (let i = elementPosition - 2; i >= 0; i--) {
                if (elements[i].is_answer === isAnswer){
                    newPos = elements[i].lesson_position;
                    break;
                }
            }
        } else if (direction === 1 && elementPosition < elements.length) {
            for (let i = elementPosition; i < elements.length; i++) {
                if (elements[i].is_answer === isAnswer) {
                    newPos = elements[i].lesson_position;
                    break;
                }                
            }
        }

        if (newPos !== 0)
            this.props.changeElementPosition(elementPosition, newPos, this.props.lesson.type, this.props.lesson.id)
    }

    render() {
        return (
            <div className={s.lesson}>
                {this.props.isFirstLesson ? <div className={s.publishCheckboxBlock}> Publish section<input type="checkbox" checked={this.props.publishedSection} onChange={() => { this.togglePublish('section') }} /> </div> : null}
                <div className={s.publishCheckboxBlock}>
                    Publish {this.props.lesson.type === 0 ? "lesson" : "task"}
                    <input type="checkbox" checked={this.props.publishedLesson} onChange={() => { this.togglePublish('lesson') }} />
                </div>
                {this.props.isFirstLesson ? <input defaultValue={this.props.sectionTitle} placeholder={"Write section title here"} onBlur={(e) => { this.editSection(e) }} /> : null}
                <input defaultValue={this.props.lessonTitle} placeholder={"Write lesson title here"} onBlur={(e) => { this.editLesson(e) }} />


                {this.state.articleElements.map(element => element)}

                <div className={s.addElements}>
                    <button onClick={() => { this.addElement(0) }}>+ Add text</button>
                    <button onClick={() => { this.addElement(1) }}>+ Add picture</button>
                    <button onClick={() => { this.addElement(2) }}>+ Add video</button>
                </div>

                {this.state.taskElement}

                {this.props.lesson.type === 1 && this.state.taskCount === 0 ?
                    <div>
                        <h2>Task</h2>
                        <div className={s.addElements}>
                            <button onClick={() => { this.addTaskElement(1) }}>+ Add one choice test</button>
                            <button onClick={() => { this.addTaskElement(2) }}>+ Add multichoice test</button>
                            <button onClick={() => { this.addTaskElement(3) }}>+ Add open answer</button>
                        </div>
                    </div>

                    : null}


                {this.props.lesson.type === 1 ?
                    <div className={s.answerBlock}>
                        <h2>Answer</h2>

                        {this.state.answerElements.map(element => element)}
                        <div className={s.addElements}>
                            <button onClick={() => { this.addElement(0, true) }}>+ Add text</button>
                            <button onClick={() => { this.addElement(1, true) }}>+ Add picture</button>
                            <button onClick={() => { this.addElement(2, true) }}>+ Add video</button>
                        </div>
                    </div>
                    : null}

            </div>
        );
    }
}

export default LessonEdit;



