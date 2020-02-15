import React from 'react';
import s from './Article.module.css';

import Video from './ArticleElements/Video'
import Picture from './ArticleElements/Picture'
import Text from './ArticleElements/Text'

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
                                    : element.type == 2 ? <Video  {...element} /> : null
                        }
                    </div>
                ) : null
            }
            <div className={s.buttonHolder} onClick={() => { completeLesson(props.lesson.id, props.lesson.type) }}> <button>Complete</button></div>
        </div>
    );
}
export default Lesson;
