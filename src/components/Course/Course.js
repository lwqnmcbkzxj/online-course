import React from 'react';
import { Route } from "react-router-dom";

import s from './Course.module.css';

import SectionsListContainer from './SectionsList/SectionsListContainer';
import LessonContainer from './Lesson/LessonContainer';


const Course = () => {
    return (
        <div className = {s.course}>
            <SectionsListContainer />
            <Route path="/course/lesson/:lessonId" render={() => <LessonContainer />} />           
           
        </div>        
    );
}
export default Course;
