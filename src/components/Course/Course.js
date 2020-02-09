import React from 'react';
import { Route } from "react-router-dom";

import s from './Course.module.css';

import SectionsListContainer from './SectionsList/SectionsListContainer';
import LessonContainer from './Lesson/LessonContainer';
import AddContainer from './Add/AddContainer'


const Course = () => {
    return (
        <div className = {s.course}>
            <SectionsListContainer />
            <Route path="/course/lesson/:lessonId" render={() => <LessonContainer />} />           
            <Route path="/course/add" render={() => <AddContainer />} />           
           
        </div>        
    );
}
export default Course;
