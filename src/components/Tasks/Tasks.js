import React from 'react';
import s from './Tasks.module.css';
import { Route } from "react-router-dom";

import TasksListContainer from './TasksList/TasksListContainer';
import LessonContainer from '../Course/Lesson/LessonContainer';


const Tasks = (props) => {
    return (
        <div className={s.tasks}>
            <TasksListContainer />
            <Route path="/tasks/:lessonId" render={() => <LessonContainer />} />           
        </div>        
    );
}
export default Tasks;
