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
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setLessonBlock(true);
            this.setLessonBlock(false);
        }
    }
    completeLesson = (lessonId, type, data = null) => {
        // this.props.completeLesson(lessonId, this.props.currentSectionId, type, data);
    }

    showAnswerBlock = () => {
        this.setState({ answerBlockVisible: true })
    }
    goToNextLesson = () => {
        this.props.goToNextLesson();
    }

    setLessonBlock = (isAnswer) => {
        let elementsArray = [];
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
                    component =
                        <Task  {...element}
                            lesson={this.props.lesson}
                            completedLessonsIds={this.props.completedLessonsIds}
                            completeLesson={this.completeLesson} />;


                elementsArray.push(<div className={s.lessonElement} key={element.id}> {component} </div>);
            })

            if (isAnswer)
                this.setState({ answerElements: elementsArray });
            else
                this.setState({ articleElements: elementsArray });
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

                <div className={s.buttonHolder}>
                    {this.props.completedLessonsIds.some(id => id === +this.props.lesson.id) ?
                        <button onClick={() => { this.goToNextLesson() }}>Next</button>
                        : this.props.lesson.type === 0 ?
                            <button onClick={() => { this.completeLesson() }}>CompleteLesson</button>
                            : null}
                </div>


                {this.props.lesson.type === 1 && this.props.answerBlockVisible ?
                    <div className={s.answerBlock}>
                        <h2>Answer</h2>
                        {this.state.answerElements.map(element => element)}
                    </div>
                    : null}
            </div>
        );
    }
}
export default Lesson;