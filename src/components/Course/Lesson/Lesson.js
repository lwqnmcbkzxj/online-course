import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'

const Lesson = (props) => {

    let completeLesson = (lessonId, type) => {
        props.completeLesson(lessonId, props.currentSectionId, type);
    }

    return (
        <div className={s.lesson}>
            {props.isFirstLesson ? <h1>{props.sectionTitle}</h1> : null}
            <h1 className={s.title}>{props.lesson.title}</h1>
            {
                props.lesson.elements ? props.lesson.elements.map(element =>
                    <div className={s.lessonElement} key={element.id}>
                        {
                            element.type == 0 ? <Video {...element} />
                                : element.type == 1 ? <Picture {...element} />
                                    : element.type == 2 ? <Text  {...element} /> : null
                        }
                    </div>
                ) : null
            }
            <div className={s.buttonHolder} onClick={() => { completeLesson(props.lesson.id, props.lesson.type) }}> <button>Complete</button></div>
        </div>
    );
}
export default Lesson;
