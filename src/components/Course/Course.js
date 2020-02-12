import React from 'react';
import { Route } from "react-router-dom";

import s from './Course.module.css';

import SectionsListContainer from './SectionsList/SectionsListContainer';
import LessonContainer from './Lesson/LessonContainer';
import Modal from '../Common/Modal/Modal';
// import AddContainer from '../Course/Add/AddContainer';


class Course extends React.Component {    
    render() {
        return (
            <div className={s.course}>
                <SectionsListContainer/>
                <Route path="/course/lesson/:lessonId" render={() => <LessonContainer />} />
                {/* <Route path="/course/add" render={() => <AddContainer />} /> */}
                <Modal modalIsVisible={this.props.modalIsVisible} toggleModalVisible={this.props.toggleModalVisible} modalFunction={this.props.modalFunction}/>
            </div>
        );
    }
}
export default Course;
