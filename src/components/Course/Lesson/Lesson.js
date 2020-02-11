import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'

const Lesson = (props) => {
    let completeLesson = (lessonId) => {
        props.completeLesson(lessonId, props.currentSectionId);
    }
    let key = 0;
    return (
        <div className={s.lesson}>
            <h1 className={s.title}>{props.lesson.title}</h1>

            {
                props.lesson.elements ? props.lesson.elements.map(lessonElement =>
                    
                    <div className={s.lessonElement} key={key}>
                        {
                            key++,
                            lessonElement.type == 0 ? <Video {...lessonElement} />
                                : lessonElement.type == 1 ? <Picture {...lessonElement} />
                                    : lessonElement.type == 2 ? <Text {...lessonElement} /> : null                                   
                            
                        }
                        
                    </div>
                    
                ) : null
            }
            <div className={s.buttonHolder} onClick={() => { completeLesson(props.lesson.id) }}> <button>Complete</button></div>
        </div>
    );
}
export default Lesson;
