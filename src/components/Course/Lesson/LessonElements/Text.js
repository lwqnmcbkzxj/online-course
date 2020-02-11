import React from 'react';
import s from './LessonElements.module.css';

const Task = (props) => {
    return (
        <div className={s.text}>
            <p>{props.text}</p>
        </div>
    ); 
}
export default Task;
