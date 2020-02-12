import React from 'react';
import s from './LessonElements.module.css';

const Text = (props) => {
    return (
        <div className={s.text}>
            <h2> Lecture notes</h2>
            <p>{props.text}</p>
        </div>
    );
}
export default Text;
