import React from 'react';
import s from './Task.module.css';


const Task = (props) => {   
    return (
        <div className={s.lesson}>
            <h1 className={s.sectionTitle}>{props.sectionTitle}</h1>
            <h1 className={s.lessonTitle}>{props.lessonTitle}</h1>

            {/* {
                props.lesson.elements ? props.lesson.elements.map(element =>
                    <div className={s.lessonElement} key={element.id}>
                        {
                            element.type == 0 ? <Text {...element} />
                                : element.type == 1 ? <Picture {...element} />
                                    : element.type == 2 ? <Video  {...element} /> : null
                        }
                    </div>
                ) : null
            } */}

            <div className={s.buttonHolder} onClick={() => { /*completeLesson(props.lesson.id, props.lesson.type) */ }}> <button>Complete</button></div>

        </div>
    );
}
export default Task;
