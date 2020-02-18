import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'
import Task from './LessonElements/Task'

const Lesson = (props) => {
    let completeLesson = (lessonId, type) => {
        props.completeLesson(lessonId, props.currentSectionId, type);
    }

    return (
        <div className={s.lesson}>
            {props.isFirstLesson ? <h1 className={s.sectionTitle}>{props.sectionTitle}</h1> : null}
            <h1 className={s.lessonTitle}>{props.lessonTitle}</h1>
            {
                props.lesson.elements ? props.lesson.elements.map(element =>
                    <div className={s.lessonElement} key={element.id}>
                        {
                            element.type == 0 ? <Text {...element} />
                                : element.type == 1 ? <Picture {...element} />
                                    : element.type == 2 ? <Video  {...element} />
                                        : element.type == 3 ? <Task  {...element} /> : null
                        }
                    </div>
                ) : null
            }
            {!props.completedLessonsIds.some(id => id == props.id) ?  <div className={s.buttonHolder}>
                <button onClick={() => { completeLesson(props.lesson.id, props.lesson.type) }}>Complete lesson
                </button></div> : null}
           
        </div>
    );
}
export default Lesson;
