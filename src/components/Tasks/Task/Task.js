import React from 'react';
import s from './Task.module.css';


const Task = (props) => {
    return (
        <div className={s.task}>
            <h2>Task</h2>
            <p className={s.question}>{props.task.text}</p>
            <div className={s.imageHolder}><img src={props.task.img} /></div>
            <div>Type - {props.task.type}</div>
        </div>
    );
}
export default Task;
