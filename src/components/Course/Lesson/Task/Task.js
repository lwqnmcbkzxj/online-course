import React from 'react';
import s from './Task.module.css';

const Task = (props) => { 
    let task = null;
    switch (props.task.type) {
        case 0:
            task = <div>TEXT FIELD</div>;
            break;
        case 1:
            task = <div>singleTest</div>;
            
            break;
        case 2:
            task = <div>multiTest</div>;
                
            break;
        default:
            break;
    }


    return (
        <div className={s.task}> 
            <h2>Task</h2>
            <p className={s.question}>{props.task.text}</p>
            <div className={s.imageHolder}><img src={props.task.img}/></div>
            {task}
        </div>        
    );
}
export default Task;
