import React from 'react';
import s from './TasksList.module.css';
import { NavLink } from 'react-router-dom';

const TasksList = (props) => {
    return (
        <div className={s.taskList}>
            TASKLIST
           {
                props.tasks.map(task =>
                    <NavLink to={`/tasks/${task.id}`} key={task.id}>
                        <div className={s.task}>
                            <h1 className={s.taskName}>{task.name}</h1>
                            <div className={s.stats}>
                                <div className={s.likes}>Likes - {task.likes}</div>
                                <div className={s.views}>Views - {task.views}</div>
                                <div className={s.rating}>Rating - {task.rating}</div>
                            </div>
                        </div>

                    </NavLink>
                )
            }
        </div>
    );
}
export default TasksList;
