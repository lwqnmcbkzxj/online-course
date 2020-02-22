import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'
import Task from './LessonElements/Task'

const Lesson = (props) => {    
    let completeLesson = (lessonId, type, data = null) => {
        // props.completeLesson(lessonId, props.currentSectionId, type, data);
        goToNextLesson();
    }

    let goToNextLesson = () => {
        props.goToNextLesson();
    }
    return (
        <div className={s.lesson}>
            {props.isFirstLesson ? <h1 className={s.sectionTitle}>{props.sectionTitle}</h1> : null}
            <h1 className={s.lessonTitle}>{props.lessonTitle}</h1>
            {
                props.lesson.elements ? props.lesson.elements.map(element =>
                    <div className={s.lessonElement} key={element.id}>
                        {
                            element.type === 0 ? <Text {...element} />
                                : element.type === 1 ? <Picture {...element} />
                                    : element.type === 2 ? <Video  {...element} />
                                        : element.type === 3 ? <Task  {...element}
                                            lesson={props.lesson}
                                            completedLessonsIds={props.completedLessonsIds}
                                            completeLesson={completeLesson} /> : null
                        }
                    </div>
                ) : null
            }

            <div className={s.buttonHolder}>
                {props.completedLessonsIds.some(id => id === +props.lesson.id) ?
                    <button onClick={() => { goToNextLesson() }}>Next</button>
                    : props.lesson.type === 0 ?
                        <button onClick={() => { completeLesson() }}>CompleteLesson</button>
                        : null}
            </div>

        </div>
    );
}
export default Lesson;
