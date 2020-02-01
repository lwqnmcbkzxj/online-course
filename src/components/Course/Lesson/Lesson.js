import React from 'react';
import s from './Lesson.module.css';


const Lesson = (props) => {
    return (
        <div className = {s.lesson}>           
            <h1 className={s.title}>{props.lesson.title}</h1>
            <div className={s.media}>
                {/* {props.lesson.media} */}
            </div>
            <div className={s.lessonText}>
                {props.lesson.text}
            </div>
            <div className={s.task}>
                {props.lesson.task}
            </div>
        </div>        
    );
}
export default Lesson;
