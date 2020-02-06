import React from 'react';
import s from './TasksList.module.css';
import { NavLink } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import rating1 from '../../../assets/images/rating-1.png'
import rating2 from '../../../assets/images/rating-2.png'
import rating3 from '../../../assets/images/rating-3.png'
const TasksList = (props) => {
    return (
        <div className={s.tasksList}>
           {
                props.tasks.map(task =>
                    <NavLink to={`/tasks/${task.id}`} key={task.id}>
                        <div className={s.task}>
                            <h1 className={s.taskName}>{task.name}</h1>
                            <div className={s.stats}>
                                <div className={s.rating}> <img src={ task.rating == 1 ? rating1 : task.rating == 2 ? rating2 : rating3 }/></div>
                                <div className={s.likes}><i className="fa fa-heart" aria-hidden="true"></i> {task.likes}</div>
                                <div className={s.views}><i className="fa fa-eye" aria-hidden="true"></i> {task.views}</div>
                            </div>
                        </div>

                    </NavLink>
                )
            }
        </div>
    );
}
export default TasksList;
