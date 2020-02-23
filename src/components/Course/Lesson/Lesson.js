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
        articleElements: []
    }

    componentDidMount() {
        this.setLessonBlock(true);
        this.setLessonBlock(false);
    }
    componentDidUpdate(prevProps) {
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
        this.props.likeLesson(this.props.lesson.id);
    }

    setLessonBlock = (isAnswer) => {
        let answerElements = [];
        let articleElements = [];
        let taskComponent = "";
        if (this.props.lesson.elements) {
            this.props.lesson.elements.map(element => {

                let component = '';
                if (element.type === 0)
                    component = <Text {...element} />;
                else if (element.type === 1)
                    component = <Picture {...element} />;
                else if (element.type === 2)
                    component = <Video {...element} />;
                else if (element.type === 3)
                    taskComponent = 
                        <div className={s.lessonElement} key={`lesson-${element.id}`}>
                            <Task  {...element}
                                lesson={this.props.lesson}
                                completedLessonsIds={this.props.completedLessonsIds}
                                completeLesson={this.completeLesson} showAnswerBlock={this.showAnswerBlock} />
                        </div>;


                if (element.is_answer)
                    answerElements.push(<div className={s.lessonElement} key={`lesson-${element.id}`}> {component} </div>);
                else
                    articleElements.push(<div className={s.lessonElement} key={`answer-${element.id}`}> {component} </div>);

            })

            if (taskComponent)
                articleElements.push(taskComponent);

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

                <div className={s.articleBlock}>
                    {this.state.articleElements.map(element => element)}
                </div>

                {this.props.lesson.type === 1 && this.state.answerBlockVisible && this.state.answerElements.length ?
                    <div className={s.answerBlock}>
                        <h2>Answer</h2>
                        {this.state.answerElements.map(element => element)}
                    </div>
                    : null}

                <div className={s.buttonHolder}>
                    {this.props.completedLessonsIds.some(id => id === +this.props.lesson.id) ?
                        <div>
                            <button onClick={() => { this.goToNextLesson() }}>Next</button>
                            <div className={s.likeLesson}>Like lesson <button onClick={this.likeLesson}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button></div>
                        </div>
                        : this.props.lesson.type === 0 ?
                            <button onClick={() => { this.completeLesson() }}>Complete Lesson</button>
                            : null}
                </div>



            </div>
        );
    }
}
export default Lesson;