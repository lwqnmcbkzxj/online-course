import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'

class Lesson extends React.Component {
    state = {
        isFirstLesson: false,
        sectionTitle: '',
    }
    componentDidUpdate(prevProps) {
        if (prevProps.lesson.id !== this.props.lesson.id) {
            this.props.sections.map(section => {
                if (section.id == this.props.currentSectionId) {
                    if (section.lessons[0].id == this.props.lesson.id) {
                        this.setState({
                            isFirstLesson: true,
                            sectionTitle: section.title
                        });
                    }
                    else {
                        this.setState({
                            isFirstLesson: false,
                            sectionTitle: ''
                        });
                    }
                }
            })
        }
    }


    completeLesson = (lessonId) => {
        this.props.completeLesson(lessonId, this.props.currentSectionId);
    }

    render() {
        return (
            <div className={s.lesson}>
                {
                    this.state.isFirstLesson ? <h1>{this.state.sectionTitle}</h1> : null
                }
                <h1 className={s.title}>{this.props.lesson.title}</h1>
                {
                    this.props.lesson.elements ? this.props.lesson.elements.map(element =>
                        <div className={s.lessonElement} key={element.position}>
                            {
                                element.type == 0 ? <Video {...element} />
                                    : element.type == 1 ? <Picture {...element} />
                                        : element.type == 2 ? <Text  {...element} /> : null

                            }

                        </div>

                    ) : null
                }
                <div className={s.buttonHolder} onClick={() => { this.completeLesson(this.props.lesson.id) }}> <button>Complete</button></div>
            </div>
        );
    }
}
export default Lesson;
