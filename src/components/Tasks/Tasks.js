import React from 'react';
import s from './Tasks.module.css';
import { Route } from "react-router-dom";

import TasksListContainer from './TasksList/TasksListContainer';
import TaskContainer from './Task/TaskContainer';


const Tasks = (props) => {
    return (
        <div className={s.tasks}>
            <TasksListContainer />
            <Route path="/tasks/:taskId" render={() => <TaskContainer />} />           
        </div>        
    );
}
export default Tasks;
