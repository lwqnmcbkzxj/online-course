import React from 'react';
import s from './Lesson.module.css';

import Media from './Media/Media'
import Task from './Task/Task'
const Lesson = (props) => {
    
    return (
        <div className = {s.lesson}>           
            <h1 className={s.title}>{props.lesson.title}</h1>
            
            <Media media={props.lesson.media} /> 
            
            <div className={s.lessonText}>
                <h2>Lecture notes</h2>
                <p>{props.lesson.text}</p>               
            </div>
            <Task task={props.lesson.task} />       
            <div className={s.buttonHolder}> <button>Complete</button></div>
        </div>        
    );
}
export default Lesson;
