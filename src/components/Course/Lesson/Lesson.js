import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'
import Task from './LessonElements/Task'

class Lesson extends React.Component {
    state = {
        answerBlockVisible: false,
        answerElements: [],
        articleElements: [],
        taskElement: '',
        lessonLiked: false,
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
    completeLesson = (lessonId = this.props.lesson.id, sectionId = this.props.currentSectionId, data = null) => {
        this.props.completeLesson(lessonId, sectionId, this.props.lesson.type, data);
    }

    showAnswerBlock = () => {
        this.setState({ answerBlockVisible: true })
    }
    goToNextLesson = () => {
        this.props.goToNextLesson();
    }

    likeLesson = () => {
        this.setState({ lessonLiked: true });
        this.props.likeLesson(this.props.lesson.id);
    }

    setLessonBlock = (isAnswer) => {
        let answerElements = [];
        let articleElements = [];
        let taskElement = "";
        if (this.props.lesson.elements) {
            this.props.lesson.elements.map(element => {

                let component = '';
                if (element.type === 0 && (element.text || element.media))
                    component = <Text {...element} />;
                else if (element.type === 1 && (element.text || element.media))
                    component = <Picture {...element} />;
                else if (element.type === 2 && (element.text || element.media))
                    component = <Video {...element} />;
                else if (element.type === 3)
                    taskElement =
                        <div className={s.lessonElement} key={`task-${element.id}`}>
                            <Task  {...element}
                                lesson={this.props.lesson}
                                completedLessonsIds={this.props.completedLessonsIds}
                                completeLesson={this.completeLesson} showAnswerBlock={this.showAnswerBlock} />
                        </div>;

                if (component) {
                    if (element.is_answer)
                        answerElements.push(<div className={s.lessonElement} key={`answer-${element.id}`}> {component} </div>);
                    else
                        articleElements.push(<div className={s.lessonElement} key={`lesson-${element.id}`}> {component} </div>);
                }
            })

            if (taskElement)
                this.setState({ taskElement });

            if (isAnswer)
                this.setState({ answerElements });
            else
                this.setState({ articleElements });
        }
    }

    render() {
        return (
            <div className={s.lesson}>
                {this.props.isFirstLesson ? <h1 className={s.sectionTitle}>{this.props.sectionTitle}</h1> : null}
                <h1 className={s.lessonTitle}>{this.props.lessonTitle}</h1>

                {this.state.articleElements.length ? <div className={s.articleBlock}>
                    <h2>Lecture notes</h2>
                    {this.state.articleElements.map(element => element)}
                </div> : null}

                {this.state.taskElement}
                

                {this.props.completedLessonsIds.some(id => id === +this.props.lesson.id) ?
                    <div className={s.lessonButtons}>

                        <div className={s.buttonHolder}>
                            <button onClick={() => { this.goToNextLesson() }}>Next</button>
                        </div>

                        <div className={s.likeLesson}>
                            <button onClick={this.likeLesson}>
                                {!this.state.lessonLiked ? "Like lesson  " : "Lesson Liked "}
                                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    : this.props.lesson.type === 0 ?
                        <div className={s.buttonHolder}>
                            <button onClick={() => { this.completeLesson() }}>Complete Lesson</button>
                        </div>
                        : null}
                
                {this.props.lesson.type === 1 && this.state.answerBlockVisible && this.state.answerElements.length ?
                    <div className={s.answerBlock}>
                        <h2>Answer</h2>
                        {/* {this.state.answerElements.map(element => element)} */}
                    </div>
                    : null}
            </div>
        );
    }
}
export default Lesson;