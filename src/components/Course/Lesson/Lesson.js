import React from 'react';
import s from './Lesson.module.css';

import Video from './LessonElements/Video'
import Picture from './LessonElements/Picture'
import Text from './LessonElements/Text'
import Task from './LessonElements/Task'

const Lesson = (props) => {    
    let completeLesson = (lessonId, type) => {
        props.completeLesson(lessonId, props.currentSectionId, type);
        goToNextLesson();
    }

    let goToNextLesson = () => {
        let position = 0;
        let sectPos = 0;
        let lesPos = 0;
        props.sections.map((section, sectionCounter) => {
            if (section.id === props.currentSectionId) {
                sectPos = sectionCounter;
                section.lessons.map((lesson, lessonCounter) => {
                    if (lesson.id === +props.lesson.id) {
                        lesPos = lessonCounter;
                    }
                })
            }
        })

        let nextId = 0;
        if (props.sections[sectPos].lessons[lesPos + 1]) {
            nextId = props.sections[sectPos].lessons[lesPos + 1].id;
        } else {
            while (nextId !== 0) {
                sectPos++;
                if (props.sections[sectPos].lessons)
                    nextId = props.sections[sectPos].lessons[0];
            }
        }

        props.history.push(`/course/lesson/${nextId}`)
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
